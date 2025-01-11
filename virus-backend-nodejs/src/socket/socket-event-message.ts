import { Character } from "../game/characters/character-entity";
import { SocketEvent } from "./enum-events";

export type Socket_Message_Event = {
    type: SocketEvent;
    payload: {
        message: string;
        playerID: string;
    };
    };