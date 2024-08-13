import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { WebSocket } from 'ws';
import { Debugger } from '@Types/debugger';

@Injectable()
export class DebugService {
  private wsClient: WebSocket & { mySend: any };
  private scriptId: string;
  private callFrames: Debugger.CallFrameItemType[];
  private id: number = 1;
  startDebug() {
    const debugProcess = spawn('node', ['--inspect=0.0.0.0:9229', './test.js']);
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
  getInfos() {
    return {
      scriptId: this.scriptId,
      callFrames: this.callFrames,
    };
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
    const regex = /Debugger listening on\s+(ws:\/\/[^\s]+)/;
    const match = str.match(regex);
    if (match && match[1]) {
      return match[1]?.replace('0.0.0.0', '127.0.0.1');
    }
    return null;
  }

  // debugger: 启用调试
  private enableDebugger() {
    this.wsClient.mySend('{"method": "Debugger.enable"}');
  }
  // debugger: 单步执行下一个函数调用
  private stepInfo() {
    this.wsClient.mySend(
      '{"method": "Debugger.stepInto", "params": {"callFrameId": "callFrameId"}}',
    );
  }
  // debugger: 步骤
  private stepNext() {
    this.wsClient.mySend(
      '{"method": "Debugger.stepInto", "params": {"callFrameId": "callFrameId"}}',
    );
  }
  // debugger: 单步跳过下一个函数调用
  private stepOver() {
    this.wsClient.mySend(
      '{"method": "Debugger.stepOver", "params": {"callFrameId": "callFrameId"}}',
    );
  }
  // debugger: 单步跳出当前函数
  private stepOut() {
    this.wsClient.mySend(
      '{"method": "Debugger.stepOut", "params": {"callFrameId": "callFrameId"}}',
    );
  }
  // debugger: 获取作用域和调用堆栈
  private getProperties() {
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
