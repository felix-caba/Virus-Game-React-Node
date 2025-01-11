import { createMap, generateBushes } from "../tools/map-creator";


export function generateMap() {

    const board = createMap(5);
    generateBushes(board, 0.5);

    return board;

}




