import { Cell } from "../map/map-elements";
import { Ability } from "./character-abilities";



export type Class = {
    name: string;
    description: string;
    ability: Ability;
}