import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IncomingMessage } from 'http';
import { Server, WebSocket } from 'ws';
import * as Y from 'yjs';
// import * as yawareness from 'y-protocols/awareness'
import { setupYjsWsConnection } from './y-websocket';
import { setupDebugWsConnection } from '../debug/debug.websocket';
import { Injectable } from '@nestjs/common';

@Injectable()
@WebSocketGateway({
  transports: ['websocket'],
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private clients: Map<string, { socket: WebSocket; room: string | null }> =
    new Map();
  private docs: Map<string, Y.Doc> = new Map();

  constructor() {}

  handleConnection(client: WebSocket, message: IncomingMessage) {
    const room = message.url.match(/room=([^&/]+)/)?.[1];
    const debug = message.url.match(/debug=([^&/]+)/)?.[1];
    if (room) {
      setupYjsWsConnection(client, message, { docName: room, gc: true });
    } else if (debug) {
      setupDebugWsConnection(client);
    } else {
      client.close();
    }
  }

  handleDisconnect() {}

  handleMessage() {}
  broadcast(room: string, message: Buffer | string, senderId?: string) {
    for (const [clientId, client] of this.clients.entries()) {
      if (client.room === room && clientId !== senderId) {
        if (typeof message === 'string') {
          client.socket.send(message);
        } else {
          client.socket.send(message, { binary: true });
        }
      }
    }
  }

  generateClientId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
