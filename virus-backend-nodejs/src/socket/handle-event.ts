import { GameState } from "../game/game-state";
import { Board } from "../game/map/map-elements";
import { SocketEvent } from "./enum-events";
import { Socket_Message_Event } from "./socket-event-message";

export function handleSocketEvents (
    event: Socket_Message_Event, gameState: GameState) {
        
    const type = event.type;

    switch (type) {
        case SocketEvent.USER_JOIN_MAP:

            const map_size = gameState.board.cells.length;
            const random_position = Math.floor(Math.random() * map_size);
            const character_position = gameState.board.cells[random_position].position;

            const newPlayer = {
                name: event.payload.message,
                position: character_position,
                health: 100,
            };

            gameState.board.cells[random_position].object.playerID = event.payload.playerID;
            gameState.players.set(event.payload.playerID, newPlayer);

            console.log('--> Un usuario ha entrado al mapa');

            break;

        case SocketEvent.USER_MOVE:
            
            


            break;
        case SocketEvent.USER_ATTACK:
            console.log('USER_ATTACK');
            break;
        case SocketEvent.USER_END_TURN:
            console.log('USER_END_TURN');
            break;
        default:
            console.log('Invalid event');
    }
}