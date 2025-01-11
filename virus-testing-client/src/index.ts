import WebSocket, { WebSocketServer } from 'ws';

// connect to localhost WebSocket server on 8080

export enum SocketEvent {
    USER_START_GAME = 'USER_START_GAME',
    USER_MOVE = 'USER_MOVE',
    USER_ATTACK = 'USER_ATTACK',
    USER_END_TURN = 'USER_END_TURN',
    USER_JOIN_MAP = 'USER_JOIN_MAP',
    USER_LEAVE_MAP = 'USER_LEAVE_MAP',
 }

export type Socket_Message_Event = {
    type: SocketEvent;
    payload: {
        message: string;
        playerID: string;
    };
    };

const ws = new WebSocket('ws://localhost:8080');

// send message to server

ws.on('open', () => {
    const message: Socket_Message_Event = {
        type: SocketEvent.USER_MOVE,
        payload: {
            message: 'UP',
            playerID: '1'
        }
    };
    ws.send(JSON.stringify(message));
});