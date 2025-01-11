import { GameState } from "../game/game-state";
import { Board, Cell, Position } from "../game/map/map-elements";
import { SocketEvent } from "./enum-events";
import { Socket_Message_Event } from "./socket-event-message";
import { MapElement } from "../game/map/map-objects";

export function handleSocketEvents (
    event: Socket_Message_Event, gameState: GameState) {
        
    const type = event.type;

    switch (type) {
        case SocketEvent.USER_JOIN_MAP:

            handlePlayerJoinMap(event, gameState);
            showAllCells(gameState);

            break;
        case SocketEvent.USER_LEAVE_MAP:
            
            handlePlayerLeaveMap(event, gameState);
            showAllCells(gameState);

            break;

        case SocketEvent.USER_MOVE:


            handlePlayerMove(event, gameState);
            showAllCells(gameState);

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

function handlePlayerLeaveMap(eventSocket: Socket_Message_Event, gameState: GameState) {

    const cell = gameState.board.cells.find(cell => cell.object.playerID === eventSocket.payload.playerID);
    cell?.object && (cell.object.playerID = undefined);
    gameState.players.delete(eventSocket.payload.playerID);
    console.log('--> Un usuario ha salido del mapa');

}

function handlePlayerJoinMap(eventSocket: Socket_Message_Event, gameState: GameState) {
   
    const initialCell = findEmptyCell(gameState);
    const newPlayer = {
        name: eventSocket.payload.message,
        position: initialCell.position,
        health: 100,
    };

    initialCell.object.playerID = eventSocket.payload.playerID;
    gameState.players.set(eventSocket.payload.playerID, newPlayer);

    console.log('--> Un usuario ha entrado al mapa');
    
}

function findEmptyCell(gameState: GameState): Cell {
    const map_size = gameState.board.cells.length;
    let random_position = Math.floor(Math.random() * map_size);
    while (gameState.board.cells[random_position].object.element !== MapElement.GRASS 
        && gameState.board.cells[random_position].object.playerID !== undefined) {

        random_position = Math.floor(Math.random() * map_size);
    }
    return gameState.board.cells[random_position];
}

function handlePlayerMove(event: Socket_Message_Event, gameState: GameState) {

    const MOVEMENTS = {
        UP: { x: 0, y: -1 },
        DOWN: { x: 0, y: 1 },
        LEFT: { x: -1, y: 0 },
        RIGHT: { x: 1, y: 0 }
    };

    const direction = event.payload.message as keyof typeof MOVEMENTS;
    const move = MOVEMENTS[direction];
    if (!move) return;

  
    const currentCell = findCellByPlayerId(gameState, event.payload.playerID);
    if (!currentCell) return;

    const newPosition = {
        x: currentCell.position.x + move.x,
        y: currentCell.position.y + move.y
    };

    
    const targetCell = findCellByPosition(gameState, newPosition);
    if (!targetCell ) return;

   
    currentCell.object.playerID = undefined;
    targetCell.object.playerID = event.payload.playerID;

}


function findCellByPosition(gameState: GameState, position: Position): Cell | undefined {
    return gameState.board.cells.find(cell => 
        cell.position.x === position.x && 
        cell.position.y === position.y
    );
}

function getPlayerPosition(gameState: GameState, playerId: string): Position | null {
    const cell = findCellByPlayerId(gameState, playerId);
    return cell ? cell.position : null;
}

function findCellByPlayerId(gameState: GameState, playerId: string): Cell | null {
    return gameState.board.cells.find(cell => cell.object.playerID === playerId) || null;
}

function showAllCells(gameState: GameState) {
    gameState.board.cells.forEach(cell => {
        console.log(cell.object);
    });
}