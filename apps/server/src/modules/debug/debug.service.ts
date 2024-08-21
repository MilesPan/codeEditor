import { Injectable } from '@nestjs/common';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { WebSocket, MessageEvent } from 'ws';
import { Debugger } from '@Types/debugger';
import * as fs from 'fs';
import { StartDebugDto, StartDebugResponseDto } from '@Dtos/debug';
import { pathToFileURL } from 'url';
const EXCLUDE_NAMES = [
  'require',
  'module',
  'exports',
  '__filename',
  '__dirname',
];

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
  private hightlightLine: number;
  private debugProcess: ChildProcessWithoutNullStreams;
  private port = 9230;
  async startDebug(startDebugDto: StartDebugDto) {
    const { code, breakPoints } = startDebugDto;
    this.breakPoints = breakPoints;
    if (!this.breakPoints?.length) this.breakPoints = [0];
    this.generateCode(code);
    this.debugProcess = spawn('node', [
      `--inspect=127.0.0.1:${this.port++}`,
      this.PATH,
    ]);
    return new Promise((resolve, reject) => {
      this.debugProcess.stderr.on('data', (data) => {
        const wsUrl = this.extractWsUrl(data.toString());
        console.log(wsUrl);
        if (!wsUrl) return;
        this.initEnhanceWsClient(wsUrl);
        this.wsClient.addEventListener('open', () => {
          this.#enableDebugger();
          console.log('open');
        });

        const handler = async (event: MessageEvent) => {
          const message = JSON.parse(event.data.toString());
          if (message.method === COMMAND.paused) {
            try {
              const res = await this.convertResult(
                await this.fetchProperties(),
              );
              resolve({ result: res, curLine: this.hightlightLine });
            } catch (error) {
              reject(error);
            } finally {
              this.wsClient.removeEventListener('message', handler);
            }
          }
        };
        this.wsClient.addEventListener('message', handler);
      });
    });
  }
  async convertResult(result: Debugger.PropertyItemType[]) {
    try {
      const results = [];

      for (const prop of result) {
        const { name, value } = prop;
        if (EXCLUDE_NAMES.includes(name)) {
          continue;
        }
        if (value.type === 'object' && value.objectId) {
          // 如果这是一个复杂对象类型，递归获取其属性
          const nestedProperties = await this.fetchProperties(value.objectId);
          const nestedReults = await this.convertResult(nestedProperties);
          results.push({
            name: name,
            value: nestedReults,
            type: value.type,
          });
        } else if (value.type === 'function') {
          results.push({
            name: name,
            value: value.description,
            type: value.type,
          });
        } else {
          // 否则，直接使用值
          results.push({
            name: name,
            value: value.value,
            type: value.type,
          });
        }
      }
      return results;
    } catch (error) {
      throw new Error('error');
    }
  }
  effects(message: any) {
    switch (message.method) {
      case COMMAND.scriptParsed:
        this.scriptId = message.params.scriptId;
        break;
      case COMMAND.paused:
        this.callFrames = message.params.callFrames;
        this.hightlightLine = this.callFrames[0].location.lineNumber;
        break;
      case COMMAND.enable:
        this.debuggerId = message.result.debuggerId;
        this.#setBreakpoints();
        break;
      case COMMAND.setBreakpointByUrl:
        break;
    }
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
  async resume() {
    this.#resume();
    await this.#paused();
    return this.resolveProperties();
  }
  async stepInto() {
    this.#stepInto();
    await this.#paused();
    return this.resolveProperties();
  }
  async stepOver() {
    this.#stepOver();
    await this.#paused();
    return this.resolveProperties();
  }
  async stepOut() {
    this.#stepOut();
    await this.#paused();
    return this.resolveProperties();
  }
  #paused() {
    return new Promise((resolve, reject) => {
      const handler = (event: MessageEvent) => {
        const message = JSON.parse(event.data.toString());
        if (message.error) {
          reject(message.error);
          this.wsClient.removeEventListener('message', handler);
        }
        if (message.method === COMMAND.paused) {
          resolve(undefined);
          this.wsClient.removeEventListener('message', handler);
        }
      };
      this.wsClient.addEventListener('message', handler);
      // this.#resume();
    });
  }
  private fetchProperties(
    objectId?: string,
  ): Promise<Debugger.PropertyItemType[]> {
    return new Promise((resolve, reject) => {
      const handler = (event: MessageEvent) => {
        const message = JSON.parse(event.data.toString());
        if (Array.isArray(message.result?.result)) {
          const hasEntries =
            Boolean(message.result.internalProperties) &&
            message.result.internalProperties.findIndex(
              (r) => r.name === '[[Entries]]',
            ) !== -1;
          console.log('hasEntries', message.result);
          if (!message.result.result.length && hasEntries) {
            resolve(
              message.result.internalProperties.filter(
                (r) => r.name === '[[Entries]]',
              ),
            );
          } else {
            resolve(message.result.result);
          }
          this.wsClient.removeListener('message', handler);
        }
        if (message.error) reject(message.error);
        this.wsClient.removeListener('message', handler);
      };
      this.wsClient.addEventListener('message', handler);
      this.#getProperties(objectId);
    });
  }
  private resolveProperties(): Promise<StartDebugResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.convertResult(await this.fetchProperties());
        resolve({ result: res, curLine: this.hightlightLine });
      } catch (error) {
        reject(error);
      }
    });
  }
  // 初始化并增强一下wsClient, 因为每次send时都要传一个id所以改写一下send方法
  private initEnhanceWsClient(wsUrl: string) {
    this.wsClient = new WebSocket(wsUrl) as WebSocket & { mySend: any };
    this.wsClient.setMaxListeners(40);
    this.wsClient.mySend = (...args: [string]) => {
      this.id++;
      const json = JSON.parse(args[0]);
      json.id = this.id;
      args[0] = JSON.stringify(json);

      console.log(json);
      this.wsClient.send(...args);
    };
    this.wsClient.addEventListener('close', () => {
      this.wsClient.removeAllListeners();
    });
    this.wsClient.addEventListener('message', (event: MessageEvent) => {
      const message = JSON.parse(event.data.toString());
      if (message?.result?.debuggerId) message.method = COMMAND.enable;
      this.effects(message);
    });
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
  #disableDebugger() {
    this.wsClient.mySend('{"method": "Debugger.disable"}');
    this.#resume();
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
      '{"method": "Debugger.stepOver", "params": {"skipList": []}}',
    );
  }
  // debugger: 单步跳出当前函数
  #stepOut() {
    this.wsClient.mySend('{"method": "Debugger.stepOut", "params": {}}');
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
  #getProperties(objectId?: string) {
    const params: Debugger.GetPropertiesParamType = {
      objectId:
        objectId ??
        this.callFrames?.[0]?.scopeChain?.[0]?.object?.objectId ??
        '',
      ownProperties: true,
      accessorPropertiesOnly: false,
      nonIndexedPropertiesOnly: true,
      generatePreview: true,
    };
    this.wsClient.mySend(
      `{"method": "${COMMAND.getProperties}", "params": ${JSON.stringify(params)} }`,
    );
  }
}
