import codeStore, { IEditor } from '@/store/codeStore';
import { clearHighlightLine, setHighlightLine } from '@/components/CodeEditor/helpers/BreakPoint';
// import { StartDebugResponseVo } from '@Dtos/debug';
import { makeAutoObservable, reaction } from 'mobx';
// import { isMyArray } from '@Utils/index';
// import { useTabContext } from '@/contexts/TabContext';
// import { Actions } from 'flexlayout-react';
// import model, { TabName } from '@/components/FlexLayout/model';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { UserStore } from '.';
import { DebugProtocol } from '@Debugger/debug.protocol';
import * as path from 'path-browserify';
import cloneDeep from 'lodash-es/cloneDeep';

class DebugStore {
  skipKeys = ['__proto__', 'constructor', 'this', 'arguments', 'caller', '[[]]', '[[Prototype]]'];

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
  curLine: number = -1;
  setCurLine(curLine: any) {
    this.curLine = curLine;
  }
  closeDebug() {
    this.setIsDebugging(false);
    this.setCurLine(-1);
    this.terminateCallbacks.forEach(cb => cb());
    this.terminateCallbacks = [];
    this.variables = [];
    this.variableStack = [];
    this.outputs = [];
    this.variablesMap = new Map();
    this.dapWebSocket?.close();
  }
  constructor() {
    makeAutoObservable(this);
  }
  breakPoints: Set<number> = new Set();
  outputs: string[] = [];
  setOutputs(outputs: string[]) {
    this.outputs = outputs;
  }
  fileName: string = '';
  setFileName(fileName: string) {
    this.fileName = fileName;
  }
  dapWebSocket: ReconnectingWebSocket | null = null;
  seq = 0;
  defaultThreadId: number | null = null;
  defaultFrameId: number | null = null;
  variables: any[] = [];
  curVariableReference: number | null = null;
  prevVariableReference: number | null = null;
  needPushStack: boolean = false;
  setVariables(variables: any) {
    this.variables = variables.filter((v: any) => !this.skipKeys.includes(v.name));
    if (
      (this.needPushStack || !this.variableStack.length) &&
      this.variableStack.every(v => v.variablesReference !== this.curVariableReference)
    ) {
      this.variableStack.push({
        variablesReference: this.curVariableReference,
        variables: cloneDeep(this.variables)
      });
      this.needPushStack = false;
    }
    this.variables.forEach((v: any) => {
      if (this.variablesMap.has(v.variablesReference)) {
        this.variablesMap.delete(v.variablesReference);
      }
      this.variablesMap.set(v.variablesReference, v);
    });
  }
  getVariable(variablesReference: number, needPushStack?: boolean) {
    this.needPushStack = Boolean(needPushStack);
    const idx = this.variableStack.findIndex(v => v.variablesReference === variablesReference);
    if (idx !== -1) {
      this.variableStack.splice(idx + 1, this.variableStack.length - idx - 1);
    }
    this.prevVariableReference = this.curVariableReference;
    this.curVariableReference = variablesReference;
    const variablesMessage: any = {
      seq: this.seq++,
      command: 'variables',
      type: 'request',
      arguments: {
        variablesReference
      }
    };
    // console.log('%cvariablesMessage', 'color: blue', 'send variablesMessage');
    this.dapWebSocket?.send(JSON.stringify(variablesMessage));
    // const variablesMessage: any = {
    //   seq: this.seq++,
    //   command: 'variables',
    //   type: 'request',
    //   arguments: {
    //     variablesReference
    //   }
    // };
    // // console.log('%cvariablesMessage', 'color: blue', 'send variablesMessage');
    // this.dapWebSocket?.send(JSON.stringify(variablesMessage));
  }
  variableStack: any[] = [];
  variablesMap: Map<number, any> = new Map();
  isObjectVariable(v: any) {
    if (v.name === 'd') {
      // console.log('vvvvvvvvvvvvvvvvvvv', v);
    }
    return v.type === 'Object' && !this.skipKeys.includes(v.name);
  }
  setupDapWebSocket(editorRef: IEditor | null) {
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
      // let outputSeq = 0;
      this.dapWebSocket?.addEventListener('message', (message: any) => {
        message = JSON.parse(message.data);
        // console.log('client recive:', message);
        if (message.type === 'event') {
          if (message.event === 'output') {
            // console.log('output', outputSeq++, message.body);
            if (message.body.category === 'stdout') {
              this.setOutputs([...this.outputs, message.body.output]);
            }
          } else if (message.event === 'initialized') {
            // console.log('initialized');
            this.setIsDebugging(true);
          } else if (message.event === 'terminated') {
            // console.log('terminated');
            this.closeDebug();
          } else if (message.event === 'stopped') {
            // console.log('stopped at:', message);
            this.defaultThreadId = message.body.threadId;
          }
        } else if (message.type === 'response') {
          // 1. initialize后，发送launch命令
          if (message.command === 'initialize') {
            // console.log('initialize response', message);
            const root = message.body.cwd;
            const program = path.join(root, this.fileName);
            const args = {
              type: 'node2',
              request: 'launch',
              name: 'Launch Program',
              program,
              cwd: root
            };
            // console.log('launchMessage', args.program);
            const launchMessage: DebugProtocol.LaunchRequest = {
              seq: this.seq++,
              command: 'launch',
              type: 'request',
              arguments: args as DebugProtocol.LaunchRequestArguments
            };
            this.dapWebSocket?.send(JSON.stringify(launchMessage));
          } else if (message.command === 'launch') {
            // 2. launch后，发送loadedSources命令
            // console.log('launch response', message);
            const loadMessage: any = {
              seq: this.seq++,
              command: 'loadedSources',
              type: 'request'
            };
            this.dapWebSocket?.send(JSON.stringify(loadMessage));
          } else if (message.command === 'loadedSources') {
            const breakPoints = Array.from(this.breakPoints).map(bp => bp + 1);
            // console.log('loadedSources response', message);
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
                lines: breakPoints,
                breakpoints: breakPoints.map(bp => {
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
            // console.log('evaluate response', message);
          } else if (
            message.command === 'configurationDone' ||
            message.command === 'next' ||
            message.command === 'stepIn' ||
            message.command === 'stepOut' ||
            message.command === 'continue'
          ) {
            // console.log('%cvariablesMap', 'color: red', this.variablesMap);
            // console.log(message.command, message);
            // 5. 发送配置完成命令后，发送threads命令
            const threadsMessage: any = {
              seq: this.seq++,
              command: 'threads',
              type: 'request'
            };
            this.dapWebSocket?.send(JSON.stringify(threadsMessage));
          } else if (message.command === 'threads') {
            // console.log('threads response', message);
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
            // console.log('%cstackTraceMessage', 'color: blue', 'send stackTraceMessage');
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
              if (message.body.stackFrames[0].source.name !== this.fileName) {
                this.stepOut();
                return;
              }
              const currentFrame = message.body.stackFrames[0];
              if (editorRef && currentFrame.line === editorRef.getModel()!.getLineCount()! + 3) {
                const terminateMessage: any = {
                  seq: this.seq++,
                  command: 'terminate',
                  type: 'request'
                };
                this.dapWebSocket?.send(JSON.stringify(terminateMessage));
                return;
              }
              this.setCurLine(currentFrame.line - 2);
              // console.log('Current execution line:', currentFrame.line);
              this.defaultFrameId = currentFrame.id;
              const scopeMessage: any = {
                seq: this.seq++,
                command: 'scopes',
                type: 'request',
                arguments: {
                  frameId: this.defaultFrameId
                }
              };
              // console.log('%cscopeMessage', 'color: blue', 'send scopeMessage');
              this.dapWebSocket?.send(JSON.stringify(scopeMessage));
            }
          } else if (message.command === 'scopes') {
            // console.log('scopes response', message.body.scopes, message.body.scopes[0]);
            this.getVariable(message.body.scopes[0].variablesReference);
          } else if (message.command === 'variables') {
            console.log('variables response', message.body);
            // console.log('%cvariables response', 'color: red', message.body.variables);
            this.setVariables(message.body.variables);
            // 保存变量信息以供显示
            // this.variables.forEach((v: any) => {
            //   if (this.variablesMap.has(v.variablesReference)) {
            //     const oldV = this.variablesMap.get(v.variablesReference);
            //     if (oldV?.name === v.name && oldV?.value === v.value && oldV.type === v.type) {
            //       return;
            //     }
            //     this.variablesMap.delete(v.variablesReference);
            //   }
            // });
            // this.variables
            //   .filter(
            //     (v: any) =>
            //       v.type === 'Object' &&
            //       !['__proto__', 'constructor', 'this', 'arguments', 'caller', '[[]]', '[[Prototype]]'].includes(v.name)
            //   )
            //   .forEach((v: any) => {
            //     if (this.variablesMap.has(v.variablesReference)) return;
            //     else {
            //       this.variablesMap.set(v.variablesReference, v);
            //     }
            //     const variablesMessage: any = {
            //       seq: this.seq++,
            //       command: 'variables',
            //       type: 'request',
            //       arguments: {
            //         variablesReference: v.variablesReference
            //       }
            //     };
            //     this.dapWebSocket?.send(JSON.stringify(variablesMessage));
            //   });
          } else if (message.command === 'terminate') {
            // console.log('terminate response', message);
          }
        }
      });
    });
  }
  startDebug() {
    const InitializeEvent = {
      seq: this.seq++,
      type: 'request',
      command: 'initialize',
      arguments: {
        clientID: 'vscode',
        clientName: 'Code - OSS Dev',
        adapterID: 'node2',
        pathFormat: 'path',
        linesStartAt1: true,
        columnsStartAt1: true,
        supportsVariableType: true,
        supportsVariablePaging: true,
        supportsRunInTerminalRequest: true,
        locale: 'zh-cn'
      }
    };
    this.dapWebSocket?.send(JSON.stringify(InitializeEvent));
  }
  stepNext() {
    const stepNextEvent: any = {
      seq: this.seq++,
      command: 'next',
      type: 'request',
      arguments: {
        threadId: this.defaultThreadId
      }
    };
    this.dapWebSocket?.send(JSON.stringify(stepNextEvent));
  }

  stepIn() {
    const stepInEvent: any = {
      seq: this.seq++,
      command: 'stepIn',
      type: 'request',
      arguments: {
        threadId: this.defaultThreadId
      }
    };
    this.dapWebSocket?.send(JSON.stringify(stepInEvent));
  }
  stepOut() {
    const stepOutEvent: any = {
      seq: this.seq++,
      command: 'stepOut',
      type: 'request',
      arguments: {
        threadId: this.defaultThreadId
      }
    };
    this.dapWebSocket?.send(JSON.stringify(stepOutEvent));
  }
  resume() {
    const resumeEvent: any = {
      seq: this.seq++,
      command: 'continue',
      type: 'request',
      arguments: {
        threadId: this.defaultThreadId
      }
    };
    this.dapWebSocket?.send(JSON.stringify(resumeEvent));
  }
  terminateCallbacks: (() => void)[] = [];
  onTerminate(callback: () => void) {
    this.terminateCallbacks.push(callback);
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
