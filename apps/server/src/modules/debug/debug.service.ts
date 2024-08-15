import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { WebSocket } from 'ws';
import { Debugger } from '@Types/debugger';
import * as fs from 'fs';
import { StartDebugDto } from '@Dtos/debug';
import { pathToFileURL } from 'url';

enum COMMAND {
  enable = 'Debugger.enable',
  setBreakpointByUrl = 'Debugger.setBreakpointByUrl',
  scriptParsed = 'Debugger.scriptParsed',
  paused = 'Debugger.paused',
  setBreakpointsActive = 'Debugger.setBreakpointsActive',
  stepInto = 'Debugger.stepInto',
  stepOver = 'Debugger.stepOver',
  stepOut = 'Debugger.stepOut',
  resume = 'Debugger.resume',
  getPossibleBreakpoints = 'Debugger.getPossibleBreakpoints',
  getProperties = 'Runtime.getProperties',
}

@Injectable()
export class DebugService {
  private wsClient: WebSocket & { mySend: any };
  private scriptId: string;
  private debuggerId: string;
  private callFrames: Debugger.CallFrameItemType[];
  private id: number = 1;
  private breakPoints: number[] = [];
  private PATH = './test1.js';
  private filePath: string;
  private lastCommand: COMMAND;
  private hightlightLine: number;
  async startDebug(startDebugDto: StartDebugDto) {
    const { code, breakPoints } = startDebugDto;
    this.breakPoints = breakPoints;

    this.generateCode(code);
    const debugProcess = spawn('node', ['--inspect=127.0.0.1:9229', this.PATH]);
    return new Promise((resolve) => {
      debugProcess.stderr.on('data', (data) => {
        const wsUrl = this.extractWsUrl(data.toString());
        if (!wsUrl) return;
        this.initEnhanceWsClient(wsUrl);
        this.wsClient.addEventListener('open', () => {
          this.#enableDebugger();
          console.log('open');
        });

        this.wsClient.addEventListener('message', (event) => {
          const message = JSON.parse(event.data.toString());

          if (message?.result?.debuggerId) message.method = COMMAND.enable;

          this.effects(message);

          if (
            this.lastCommand === COMMAND.getProperties &&
            message.result?.result?.length
          ) {
            resolve(message.result?.result);
          }
        });
      });
    });
  }

  effects(message: any) {
    switch (message.method) {
      case COMMAND.scriptParsed:
        this.scriptId = message.params.scriptId;
        break;
      case COMMAND.paused:
        this.callFrames = message.params.callFrames;
        this.hightlightLine = this.callFrames[0].location.lineNumber;
        this.#getProperties();
        return this.resolveProperties();
      case COMMAND.enable:
        this.debuggerId = message.result.debuggerId;
        this.#setBreakpoints();
        break;
      case COMMAND.setBreakpointByUrl:
        break;
    }
    return undefined;
  }
  generateCode(code: string) {
    fs.writeFileSync(this.PATH, code);
    this.filePath = pathToFileURL(this.PATH).toString();
  }
  getInfos() {
    return {
      scriptId: this.scriptId,
      callFrames: this.callFrames,
    };
  }
  resume() {
    this.#resume();
    return this.resolveProperties();
  }
  stepInto() {
    this.#stepInto();
    return this.resolveProperties();
  }
  stepOver() {
    this.#stepOver();
    return this.resolveProperties();
  }
  stepOut() {
    this.#stepOut();
    return this.resolveProperties();
  }
  private resolveProperties() {
    return new Promise((resolve) => {
      this.wsClient.addEventListener('message', (event) => {
        const message = JSON.parse(event.data.toString());
        if (message?.result?.result) {
          resolve({
            result: message.result?.result,
            curLine: this.hightlightLine,
          });
        }
      });
    });
  }
  // 初始化并增强一下wsClient, 因为每次send时都要传一个id所以改写一下send方法
  private initEnhanceWsClient(wsUrl: string) {
    this.wsClient = new WebSocket(wsUrl) as WebSocket & { mySend: any };
    this.wsClient.mySend = (...args: [string]) => {
      this.id++;
      const json = JSON.parse(args[0]);
      this.lastCommand = json.method;
      json.id = this.id;
      args[0] = JSON.stringify(json);

      this.wsClient.send(...args);
    };
  }
  // 从stderr中提取wsurl
  private extractWsUrl(str: string): string | null {
    const regex = /Debugger listening on\s+(ws:\/\/[^\s]+)/;
    const match = str.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  }
  // debugger: 启用调试
  #enableDebugger() {
    this.wsClient.mySend('{"method": "Debugger.enable"}');
  }
  // debugger: 单步执行下一个函数调用
  #stepInto() {
    this.wsClient.mySend(
      '{"method": "Debugger.stepInto", "params": {"breakOnAsyncCall":true,"skipList":[]}}',
    );
    this.#getProperties();
  }
  // debugger: 步骤
  #stepNext() {
    this.wsClient.mySend(
      '{"method": "Debugger.stepInto", "params": {"callFrameId": "callFrameId"}}',
    );
  }
  // debugger: 单步跳过下一个函数调用
  #stepOver() {
    this.wsClient.mySend(
      '{"method": "Debugger.stepOver", "params": {"callFrameId": "callFrameId"}}',
    );
  }
  // debugger: 单步跳出当前函数
  #stepOut() {
    this.wsClient.mySend(
      '{"method": "Debugger.stepOut", "params": {"callFrameId": "callFrameId"}}',
    );
  }
  // debugger: 恢复执行
  #resume() {
    this.wsClient.mySend(
      `{"method": "Debugger.resume", "params": {"terminateOnResume": false}}`,
    );
  }
  // debugger: 设置断点
  #setBreakpoints() {
    this.wsClient.mySend(
      `{"method": "Debugger.setBreakpointsActive", "params": ${JSON.stringify({ active: true })} }`,
    );
    this.breakPoints.forEach((line) => {
      const params: Debugger.SetBreakpointByUrlParamType = {
        url: this.filePath,
        lineNumber: line,
        columnNumber: 0,
        condition: '',
      };
      this.wsClient.mySend(
        `{"method": "Debugger.setBreakpointByUrl", "params": ${JSON.stringify(params)} }`,
      );
    });
  }
  // debugger: 获取作用域和调用堆栈
  #getProperties() {
    const params: Debugger.GetPropertiesParamType = {
      objectId: this.callFrames?.[0]?.scopeChain?.[0]?.object?.objectId ?? '',
      ownProperties: false,
      accessorPropertiesOnly: false,
      nonIndexedPropertiesOnly: false,
      generatePreview: true,
    };
    this.wsClient.mySend(
      `{"method": "${COMMAND.getProperties}", "params": ${JSON.stringify(params)} }`,
    );
  }
}
