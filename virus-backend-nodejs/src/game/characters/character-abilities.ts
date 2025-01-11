import { Player } from "./character-elements";

export type Ability = {
    name: string;
    description: string;
    effect: (player: Player) => {
        player: {
            attackPower?: number;
            magicPower?: number;
            evasion?: number;
            health?: number;
        }
    }
}



export const MageAbilities: Ability = {
    name: "Fireball",
    description: "Launches a powerful fireball",
    effect: (player) => ({ player: { magicPower: player.magicPower * 1.3 } })
};

export const RogueAbilities: Ability = {
    name: "Stealth",
    description: "Becomes invisible temporarily",
    effect: (player) => ({ player: { evasion: player.evasion * 2 } })
};

export const ClericAbilities: Ability = {
    name: "Heal",
    description: "Restores health points",
    effect: (player) => ({ player: { health: player.health + 50 } })
};