import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { WebSocket } from 'ws';
import { Debugger } from '@Types/debugger';
import * as fs from 'fs';
import { StartDebugDto } from '@Dtos/debug';
import { generateUUID } from '@Utils/index';

@Injectable()
export class DebugService {
  private wsClient: WebSocket & { mySend: any };
  private scriptId: string;
  private callFrames: Debugger.CallFrameItemType[];
  private id: number = 1;
  private breakPoints: number[] = [];
  private PATH = './test1.js';
  startDebug(startDebugDto: StartDebugDto) {
    const { code, breakPoints } = startDebugDto;
    debugger;
    this.breakPoints = breakPoints;

    this.generateCode(code);
    const debugProcess = spawn('node', ['--inspect=127.0.0.1:9229', this.PATH]);
    debugProcess.stderr.on('data', (data) => {
      const wsUrl = this.extractWsUrl(data.toString());
      if (!wsUrl) return;
      this.initEnhanceWsClient(wsUrl);

      this.wsClient.onopen = () => {
        this.enableDebugger();
        console.log('open');
      };
      this.wsClient.onmessage = (event) => {
        const message = JSON.parse(event.data.toString());
        switch (message.method) {
          case 'Debugger.scriptParsed':
            this.scriptId = message.params.scriptId;
            break;
          case 'Debugger.paused':
            this.callFrames = message.params.callFrames;
            break;
        }

        // console.log('message', JSON.parse(event.data.toString()).method);
      };
    });
  }
  generateCode(code: string) {
    fs.writeFileSync(this.PATH, code);
  }
  getInfos() {
    return {
      scriptId: this.scriptId,
      callFrames: this.callFrames,
    };
  }
  resume() {
    this.#resume();
  }
  stepInto() {
    this.#stepInto();
  }
  stepOver() {
    this.#stepOver();
  }
  stepOut() {
    this.#stepOut();
  }
  // 初始化并增强一下wsClient, 因为每次send时都要传一个id所以改写一下send方法
  private initEnhanceWsClient(wsUrl: string) {
    this.wsClient = new WebSocket(wsUrl) as WebSocket & { mySend: any };
    this.wsClient.mySend = (...args: [string]) => {
      this.id++;
      const json = JSON.parse(args[0]);
      json.id = this.id;
      args[0] = JSON.stringify(json);

      this.wsClient.send(...args);
    };
  }
  // 从stderr中提取wsurl
  private extractWsUrl(str: string): string | null {
    console.log(str)
    const regex = /Debugger listening on\s+(ws:\/\/[^\s]+)/;
    const match = str.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  }
  // debugger: 启用调试
  private enableDebugger() {
    this.wsClient.mySend('{"method": "Debugger.enable"}');
  }
  // debugger: 单步执行下一个函数调用
  #stepInto() {
    this.wsClient.mySend(
      '{"method": "Debugger.stepInto", "params": {"callFrameId": "callFrameId"}}',
    );
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
  #setBreakpoint() {
    this.wsClient.mySend(
      `{"method": "Debugger.setBreakpointsActive", "params": ${JSON.stringify({ active: true })} }`,
    );
    const params: Debugger.SetBreakpointByUrlParamType = {
      urlRegex: generateUUID(),
      lineNumber: 1,
      columnNumber: 1,
      condition: '',
    };
    this.wsClient.mySend(
      `{"method": "Debugger.setBreakpointByUrl", "params": ${JSON.stringify(params)} }`,
    );
  }
  // debugger: 获取作用域和调用堆栈
  #getProperties() {
    const params: Debugger.GetPropertiesParamType = {
      objectId: '8910277337095663938.1.1',
      ownProperties: false,
      accessorPropertiesOnly: false,
      nonIndexedPropertiesOnly: false,
      generatePreview: true,
    };
    this.wsClient.mySend(
      `{"method": "Runtime.getProperties", "params": ${JSON.stringify(params)} }`,
    );
  }
}
