import "phaser";
import {PinballScene} from "./pinball/pinballScene";
import GameConfig = Phaser.Types.Core.GameConfig;

const config: GameConfig = {
    title: "Starfall",
    width: 2000,
    height: 1200,
    parent: "game",
    scene: [PinballScene],
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: {y: 0.981},
        }
    },
    backgroundColor: "#18216D"
};

export class StarfallGame extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
};

window.onload = () => {
    var game = new StarfallGame(config);
};
