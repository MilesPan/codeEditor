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
import { setupWsConnection } from './y-websocket';

@WebSocketGateway({
  transports: ['websocket'],
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private clients: Map<string, { socket: WebSocket; room: string | null }> =
    new Map();
  private docs: Map<string, Y.Doc> = new Map();
  handleConnection(client: WebSocket, message: IncomingMessage) {
    const room = message.url.match(/room=([^&/]+)/)?.[1];
    setupWsConnection(client, message, { docName: room, gc: true });
  }

  handleDisconnect() {}

  handleMessage() {
    // const decoder = decoding.createDecoder(message);
    // const encoder = encoding.createEncoder();
    // const messageType = decoding.readUint8(decoder);
    // console.log(messageType);
    // if (messageType === 0) {
    //   const roomId = decoding.readVarUint(decoder);
    //   const client = this.clients.get(clientId);
    //   console.log('roomId', roomId);
    //   // console.log('client', client)
    // }
  }
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
