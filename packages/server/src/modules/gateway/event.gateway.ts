import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import * as Y from 'yjs';
// import * as yawareness from 'y-protocols/awareness'

@WebSocketGateway({
  transports: ['websocket'],
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  private clients: Map<string, { socket: WebSocket; room: string | null }> =
    new Map();
  private docs: Map<string, Y.Doc> = new Map();

  handleConnection(client: WebSocket) {
    const clientId = this.generateClientId();
    this.clients.set(clientId, { socket: client, room: null });
    client.on('message', (message: Buffer) =>
      this.handleMessage(clientId, message),
    );
    client.on('close', () => this.handleDisconnect(clientId));
  }

  handleDisconnect(clientId: string) {
    const client = this.clients.get(clientId);
    if (client && client.room) {
      this.broadcast(client.room, `${clientId} has left the room`);
    }
    this.clients.delete(clientId);
  }

  handleMessage(clientId: string, message: Buffer) {
    // const decoder = new Decoder(message);
    console.log(Y.decodeStateVector(message));
    // const messageType = decoder.readUint8();

    // // If it's a sync step message
    // if (messageType === 0) {
    //   const client = this.clients.get(clientId);
    //   if (!client) return;

    //   const roomId = readVarString(decoder);
    //   if (!client.room) {
    //     client.room = roomId;
    //     if (!this.docs.has(roomId)) {
    //       this.docs.set(roomId, new Y.Doc());
    //     }
    //     this.broadcast(client.room, `${clientId} has joined the room`);
    //   }

    //   const doc = this.docs.get(roomId);
    //   if (doc) {
    //     applyUpdate(doc, message.subarray(decoder.pos));
    //     this.broadcast(client.room, message, clientId);
    //   }
  }
  // }

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
