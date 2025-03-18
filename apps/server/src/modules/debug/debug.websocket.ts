import { WebSocket } from 'ws';
import { DebugSession } from './debug.session';

export interface DebugSocket {
  send: (content: string) => void;
  onMessage: (cb: (data: Buffer) => void) => void;
  onError: (cb: (error: Error) => void) => void;
  onClose: (cb: () => void) => void;
  dispose: () => void;
}

export function setupDebugWsConnection(webSocket: WebSocket) {
  // 创建一个适配器 socket
  const socket: DebugSocket = {
    send: (content) => {
      webSocket.send(content, (error) => {
        if (error) {
          console.error('发送消息失败:', error);
        }
      });
    },
    onMessage: (cb) => webSocket.on('message', cb),
    onError: (cb) => webSocket.on('error', cb),
    onClose: (cb) => webSocket.on('close', cb),
    dispose: () => webSocket.close(),
  };

  // 启动调试会话
  if (webSocket.readyState === webSocket.OPEN) {
    new DebugSession(socket);
  } else {
    webSocket.on('open', () => {
      new DebugSession(socket);
    });
  }
}
