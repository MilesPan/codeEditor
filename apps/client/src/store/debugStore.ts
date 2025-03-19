import codeStore from '@/store/codeStore';
import { clearHighlightLine, setHighlightLine } from '@/components/CodeEditor/helpers/BreakPoint';
import { StartDebugResponseVo } from '@Dtos/debug';
import { makeAutoObservable, reaction } from 'mobx';
import { isMyArray } from '@Utils/index';
import { useTabContext } from '@/contexts/TabContext';
import { Actions } from 'flexlayout-react';
import model, { TabName } from '@/components/FlexLayout/model';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { UserStore } from '.';
import { DebugProtocol } from '@Debugger/debug.protocol';
class DebugStore {
  debugActive: boolean = false;
  setDebugActive(status: boolean) {
    this.debugActive = status;
  }

  isDebugging: boolean = false;
  setIsDebugging(status: boolean) {
    this.isDebugging = status;
  }
  sessionId: string = '';
  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }

  // scope中的变量
  result: Record<PropertyKey, any> = {};
  setResult(result: any) {
    this.result = this.convertResult(result);
  }

  curLine: number = -1;
  setCurLine(curLine: any) {
    this.curLine = curLine;
  }
  // 将result转换为一个真正的JSON
  convertResult(result: any) {
    // if (typeof result !== 'object') return result;
    // const isArray = isMyArray(result);
    // const obj: Record<PropertyKey, any> = isArray ? [] : {};
    // result.forEach((item: any) => {
    //   if (item.type === 'undefined') {
    //     obj[item.name] = undefined;
    //   } else {
    //     if (Array.isArray(item.value)) {
    //       if (isMyArray(item.value)) {
    //         obj[item.name] = item.value
    //           .filter(childItem => childItem.name !== 'length')
    //           .map(childItem => this.convertResult(childItem.value as StartDebugResponseDto['result']));
    //       } else {
    //         obj[item.name] = this.convertResult(item.value);
    //       }
    //     } else {
    //       obj[item.name] = item.value;
    //     }
    //   }
    // });
    // return obj;
    return result;
  }

  closeDebug() {
    this.setIsDebugging(false);
    this.setCurLine(-1);
    this.setResult([]);
  }
  constructor() {
    makeAutoObservable(this);
  }
  breakPoints: number[] = [];
  setBreakPoints(arr: number[]) {
    this.breakPoints = arr;
  }
  fileName: string = '';
  setFileName(fileName: string) {
    this.fileName = fileName;
  }
  dapWebSocket: ReconnectingWebSocket | null = null;
  seq = 0;
  defaultThreadId: number | null = null;
  defaultFrameId: number | null = null;
  variables: any = [];
  setupDapWebSocket() {
    this.dapWebSocket = new ReconnectingWebSocket(
      `ws://${process.env.PUBLIC_HOST}:3000/?debug=${UserStore.userInfo.roomId}-${UserStore.userInfo.userName}`,
      undefined,
      {
        maxReconnectionDelay: 10000,
        minReconnectionDelay: 1000,
        reconnectionDelayGrowFactor: 1.3,
        connectionTimeout: 10000,
        maxRetries: Infinity,
        debug: false
      }
    );
    this.dapWebSocket?.addEventListener('open', () => {
      let outputSeq = 0;
      this.dapWebSocket?.addEventListener('message', (message: any) => {
        message = JSON.parse(message.data);
        console.log('client recive:', message);
        if (message.type === 'event') {
          if (message.event === 'output') {
            if (message.body.locationReference) {
              console.log('locationReferencexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', message.body.locationReference);
              location = message.body.locationReference;
            }
            console.log('output', outputSeq++, message.body);
          } else if (message.event === 'initialized') {
            console.log('initialized');
            this.isDebugging = true;
          } else if (message.event === 'terminated') {
            console.log('terminated');
            this.isDebugging = false;
          } else if (message.event === 'stopped') {
            console.log('stopped at:', message);
            this.defaultThreadId = message.body.threadId;
            const stackTraceMessage: any = {
              seq: this.seq++,
              command: 'stackTrace',
              type: 'request',
              arguments: {
                threadId: this.defaultThreadId,
                startFrame: 0,
                levels: 1
              }
            };
            this.dapWebSocket?.send(JSON.stringify(stackTraceMessage));
          }
        } else if (message.type === 'response') {
          // 1. initialize后，发送launch命令
          if (message.command === 'initialize') {
            console.log('initialize response', message);
            const root = message.body.cwd;
            const args = {
              type: 'node2',
              request: 'launch',
              name: 'Launch Program',
              program: this.fileName,
              cwd: root
            };
            const launchMessage: DebugProtocol.LaunchRequest = {
              seq: this.seq++,
              command: 'launch',
              type: 'request',
              arguments: args as DebugProtocol.LaunchRequestArguments
            };
            this.dapWebSocket?.send(JSON.stringify(launchMessage));
          } else if (message.command === 'launch') {
            // 2. launch后，发送loadedSources命令
            console.log('launch response', message);
            const loadMessage: any = {
              seq: this.seq++,
              command: 'loadedSources',
              type: 'request'
            };
            this.dapWebSocket?.send(JSON.stringify(loadMessage));
          } else if (message.command === 'loadedSources') {
            console.log('loadedSources response', message);
            // 3. 加载源码后，设置断点
            const breakpointMessage: any = {
              seq: this.seq++,
              command: 'setBreakpoints',
              type: 'request',
              arguments: {
                source: {
                  name: 'test.js',
                  path: this.fileName
                },
                lines: this.breakPoints,
                breakpoints: this.breakPoints.map(bp => {
                  return { line: bp };
                }),
                sourceModified: false
              }
            };
            this.dapWebSocket?.send(JSON.stringify(breakpointMessage));
          } else if (message.command === 'setExceptionBreakpoints' || message.command === 'setBreakpoints') {
            // 4.设置完断点后， 发送configDone 命令
            const configDoneMessage: any = {
              seq: this.seq++,
              command: 'configurationDone',
              type: 'request'
            };
            this.dapWebSocket?.send(JSON.stringify(configDoneMessage));
          } else if (message.command === 'evaluate') {
            console.log('evaluate response', message);
          } else if (
            message.command === 'configurationDone' ||
            message.command === 'next' ||
            message.command === 'stepIn' ||
            message.command === 'stepOut' ||
            message.command === 'continue'
          ) {
            console.log(message.command, message);
            // 5. 发送配置完成命令后，发送threads命令
            const threadsMessage: any = {
              seq: this.seq++,
              command: 'threads',
              type: 'request'
            };
            this.dapWebSocket?.send(JSON.stringify(threadsMessage));
          } else if (message.command === 'threads') {
            console.log('threads response', message);
            // 6. 获取到threads后，获取栈帧
            if (message.body.threads.length === 0) return;
            this.defaultThreadId = message.body.threads[0].id;
            const stackTraceMessage: any = {
              seq: this.seq++,
              command: 'stackTrace',
              type: 'request',
              arguments: {
                threadId: this.defaultThreadId,
                startFrame: 0,
                levels: 1
              }
            };
            this.dapWebSocket?.send(JSON.stringify(stackTraceMessage));
          } else if (message.command === 'stackTrace') {
            if (this.isDebugging) {
              if (!message.success) {
                const stackTraceMessage: any = {
                  seq: this.seq++,
                  command: 'stackTrace',
                  type: 'request',
                  arguments: {
                    threadId: this.defaultThreadId,
                    startFrame: 0,
                    levels: 1
                  }
                };
                this.dapWebSocket?.send(JSON.stringify(stackTraceMessage));
                return;
              }
              const currentFrame = message.body.stackFrames[0];
              console.log('Current execution line:', currentFrame.line);
              this.defaultFrameId = currentFrame.id;

              const variablesMessage: any = {
                seq: this.seq++,
                command: 'variables',
                type: 'request',
                arguments: {
                  frameId: this.defaultFrameId
                }
              };
              this.dapWebSocket?.send(JSON.stringify(variablesMessage));
              const scopeMessage: any = {
                seq: this.seq++,
                command: 'scopes',
                type: 'request',
                arguments: {
                  frameId: this.defaultFrameId
                }
              };
              this.dapWebSocket?.send(JSON.stringify(scopeMessage));
            }
          } else if (message.command === 'scopes') {
            console.log('scopes response', message.body.scopes[0]);
            const variablesMessage: any = {
              seq: this.seq++,
              command: 'variables',
              type: 'request',
              arguments: {
                variablesReference: message.body.scopes[0].variablesReference
              }
            };
            this.dapWebSocket?.send(JSON.stringify(variablesMessage));
          } else if (message.command === 'variables') {
            console.log('variables response', message);
            // 保存变量信息以供显示
            this.variables = message.body.variables;
            // 在控制台打印变量，方便调试
            console.log('Current variables:', this.variables);
          } else if (message.command === 'terminate') {
            console.log('terminate response', message);
          }
        }
      });
    });
  }
}
const debugStore = new DebugStore();
reaction(
  () => debugStore.curLine,
  curLine => {
    if (codeStore.editorRef && codeStore.monacoRef) {
      if (curLine === -1) {
        clearHighlightLine(codeStore.editorRef);
        debugStore.setIsDebugging(false);
      } else setHighlightLine(codeStore.editorRef, (curLine || 0) + 1, codeStore.monacoRef);
    }
  }
);

export default debugStore;
