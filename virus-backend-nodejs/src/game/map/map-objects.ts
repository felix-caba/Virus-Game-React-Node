import { Character } from "../characters/character-entity";

export enum MapElement{
    GRASS = 'grass',
    ROCK = 'rock',
    BUSH = 'bush',
    
}

export type MapObject = {
    element: MapElement;
    playerID?: string;
}
