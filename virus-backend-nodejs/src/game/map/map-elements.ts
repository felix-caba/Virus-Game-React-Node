import { MapElement, MapObject } from "./map-objects";

export type Board = {
    cells: Cell[];
}

export type Cell = {
    position: Position;
    object: MapObject;
}

export type Position = {
    x: number;
    y: number;
}
