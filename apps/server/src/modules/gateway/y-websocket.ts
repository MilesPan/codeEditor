import { IncomingMessage } from 'http';
import * as map from 'lib0/map';
import { WebSocket } from 'ws';
import * as Y from 'yjs';
import * as awarenessProtocol from 'y-protocols/awareness';
import * as syncProtocol from 'y-protocols/sync';
import * as encoding from 'lib0/encoding';
import * as decoding from 'lib0/decoding';

const docs = new Map();
const gcEnabled = true;

const messageSync = 0;
const messageAwareness = 1;

const pingTimeout = 30000;

export function setupYjsWsConnection(
  connect: WebSocket,
  req: IncomingMessage,
  { docName, gc = true }: { docName: string; gc: boolean },
) {
  connect.binaryType = 'arraybuffer';
  const doc = getYDoc(docName, gc);
  doc.conns.set(connect, new Set());

  connect.on('message', (message: ArrayBuffer) =>
    messageListener(connect, doc, new Uint8Array(message)),
  );

  let pongReceived = true;
  const pingInterval = setInterval(() => {
    if (!pongReceived) {
      if (doc.conns.has(connect)) {
        closeConn(doc, connect);
      }
      clearInterval(pingInterval);
    } else if (doc.conns.has(connect)) {
      pongReceived = false;
      try {
        connect.ping();
      } catch (error) {
        closeConn(doc, connect);
        clearInterval(pingInterval);
      }
    }
  }, pingTimeout);

  connect.on('close', () => {
    closeConn(doc, connect);
    clearInterval(pingInterval);
  });
  connect.on('pong', () => {
    pongReceived = true;
  });
  {
    const encoder = encoding.createEncoder();
    encoding.writeVarUint(encoder, messageSync);
    syncProtocol.writeSyncStep1(encoder, doc);
    send(doc, connect, encoding.toUint8Array(encoder));
    const awarenessStates = doc.awareness.getStates();
    if (awarenessStates.size > 0) {
      const encoder = encoding.createEncoder();
      encoding.writeVarUint(encoder, messageAwareness);
      encoding.writeVarUint8Array(
        encoder,
        awarenessProtocol.encodeAwarenessUpdate(
          doc.awareness,
          Array.from(awarenessStates.keys()),
        ),
      );
      send(doc, connect, encoding.toUint8Array(encoder));
    }
  }
}

function messageListener(
  conn: WebSocket,
  doc: WSSharedDoc,
  message: Uint8Array,
) {
  try {
    const encoder = encoding.createEncoder();
    const decoder = decoding.createDecoder(message);
    const messageType = decoding.readVarUint(decoder);
    switch (messageType) {
      case messageSync:
        encoding.writeVarUint(encoder, messageSync);
        syncProtocol.readSyncMessage(decoder, encoder, doc, conn);
        if (encoding.length(encoder) > 1) {
          send(doc, conn, encoding.toUint8Array(encoder));
        }
        break;
      case messageAwareness: {
        awarenessProtocol.applyAwarenessUpdate(
          doc.awareness,
          decoding.readVarUint8Array(decoder),
          conn,
        );
        break;
      }
    }
  } catch (err) {
    console.error(err);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    doc.emit('error', [err]);
  }
}

function getYDoc(docName: string, gc: boolean) {
  return map.setIfUndefined(docs, docName, () => {
    const doc = new WSSharedDoc(docName);
    doc.gc = gc;
    docs.set(docName, doc);
    return doc;
  });
}

class WSSharedDoc extends Y.Doc {
  name: string;
  conns: Map<WebSocket, Set<number>>;
  awareness: awarenessProtocol.Awareness;
  constructor(name) {
    super({ gc: gcEnabled });
    this.name = name;

    this.conns = new Map();

    this.awareness = new awarenessProtocol.Awareness(this);
    this.awareness.setLocalState(null);

    const awarenessChangeHandler = (
      {
        added,
        updated,
        removed,
      }: {
        added: Array<number>;
        updated: Array<number>;
        removed: Array<number>;
      },
      conn: WebSocket,
    ) => {
      const changedClients = added.concat(updated, removed);
      if (conn !== null) {
        const connControlledIds = this.conns.get(conn);
        if (connControlledIds !== undefined) {
          added.forEach((clientID) => connControlledIds.add(clientID));
          removed.forEach((clientID) => connControlledIds.delete(clientID));
        }
      }
      const encoder = encoding.createEncoder();
      encoding.writeVarUint(encoder, messageAwareness);
      encoding.writeVarUint8Array(
        encoder,
        awarenessProtocol.encodeAwarenessUpdate(this.awareness, changedClients),
      );
      const buff = encoding.toUint8Array(encoder);
      this.conns.forEach((_, c) => {
        send(this, c, buff);
      });
    };
    this.awareness.on('update', awarenessChangeHandler);
    this.on('update', updateHandler);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function updateHandler(update: Uint8Array, _: any, doc: WSSharedDoc) {
  const encoder = encoding.createEncoder();
  encoding.writeVarUint(encoder, messageSync);
  syncProtocol.writeUpdate(encoder, update);

  const message = encoding.toUint8Array(encoder);
  doc.conns.forEach((_, conn) => send(doc, conn, message));
}

const wsReadyStateConnecting = 0;
const wsReadyStateOpen = 1;
const send = (doc: WSSharedDoc, conn: WebSocket, m: Uint8Array) => {
  if (
    conn.readyState !== wsReadyStateConnecting &&
    conn.readyState !== wsReadyStateOpen
  ) {
    closeConn(doc, conn);
  }
  try {
    conn.send(m, {}, (err) => {
      err != null && closeConn(doc, conn);
    });
  } catch (e) {
    closeConn(doc, conn);
  }
};
const closeConn = (doc: WSSharedDoc, conn: WebSocket) => {
  if (doc.conns.has(conn)) {
    /**
     * @type {Set<number>}
     */
    const controlledIds = doc.conns.get(conn);
    doc.conns.delete(conn);
    awarenessProtocol.removeAwarenessStates(
      doc.awareness,
      Array.from(controlledIds),
      null,
    );
  }
  conn.close();
};
