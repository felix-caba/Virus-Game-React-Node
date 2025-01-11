import WebSocket, { WebSocketServer } from 'ws';

import { handleSocketEvents } from './socket/handle-event';
import { generateMap } from './game/map/map-management';
import { Board } from './game/map/map-elements';
import { GameState } from './game/game-state';

const wss = new WebSocketServer({ port: 8080 });

const gameState = {
    players: new Map(),
    board: generateMap()
    };

wss.on('connection', (ws: WebSocket) => {

    ws.on('message', (message: string) => {

        const event = JSON.parse(message);
        handleSocketEvents(event, gameState);
        updateGame(gameState);

    });

    ws.on('close', () => {

    });

    ws.on('error', (error: Error) => {
    
    });

});


function updateGame(map: GameState) {
    wss.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(map));
        }
    });
}


