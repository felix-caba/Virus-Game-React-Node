
import { Character } from "./characters/character-entity";
import { Board } from "./map/map-elements";

export type GameState = {
    players: Map<string, Character>;
    board: Board;
    };


