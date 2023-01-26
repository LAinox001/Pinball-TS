import "phaser";
import {WelcomeScene} from "./tutorial/welcomeScene";
import {GameScene} from "./tutorial/gameScene";
import {ScoreScene} from "./tutorial/scoreScene";
import {PinballScene} from "./pinball/pinballScene";

const config: GameConfig = {
    title: "Starfall",
    width: 800,
    height: 600,
    parent: "game",
    scene: [PinballScene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 981},
            debug: false
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
