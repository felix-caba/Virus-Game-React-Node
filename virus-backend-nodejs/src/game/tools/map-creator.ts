import { Cell, Board } from "../map/map-elements";
import { MapElement, MapObject } from "../map/map-objects";

function createMap(mapSize: number) {

    const board: Board = {
        cells: []
    }

    const totalCells = mapSize * mapSize;
    
    for(let i = 0; i < totalCells; i++) {

        const cell: Cell = {
            position: {
                x: Math.floor(i / mapSize),
                y: i % mapSize
            },
            object: { element: MapElement.GRASS }
        }
        board.cells.push(cell);
    }
    return board;
}

function generateBushes(board: Board, propagationRate: number) {

    const totalCells = board.cells.length;
    const initialPropagation = propagationRate;

    for(let i = 0; i < totalCells; i++) {

        if (propagationRate >= 0.75) {

            propagationRate = initialPropagation;

        }

        if(board.cells[i].object.element === MapElement.GRASS && Math.random() < propagationRate) {
            board.cells[i].object.element = MapElement.BUSH;
            propagationRate++;

        }
    }
}



export { createMap, generateBushes};
