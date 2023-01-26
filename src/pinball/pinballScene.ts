import "phaser";
import {Ball} from "./ball";
import {CustomPlatform} from "./customPlatform";

export class PinballScene extends Phaser.Scene {
    walls: Phaser.GameObjects.Group;

    stopSpawn: boolean = false;
    readonly collisionFactor: number = 0.7;

    constructor() {
        super({
            key: "PinballScene"
        });
    }

    init(params: any): void {
    }

    preload(): void {
        this.load.setBaseURL("https://raw.githubusercontent.com/mariyadavydova/" +
            "starfall-phaser3-typescript/master/");
        this.load.image("star", "assets/star.png");
        this.load.image("sand", "assets/sand.jpg");
    }

    create(): void {
        this.walls = this.add.group();
        this.walls.add(new CustomPlatform(this, 0, 0, 800, 32, "sand"));
        this.walls.add(new CustomPlatform(this, 0, 568, 800, 32, "sand"));
        this.walls.add(new CustomPlatform(this, 0, 0, 32, 568, "sand"));
        this.walls.add(new CustomPlatform(this, 768, 0, 32, 568, "sand"));
        this.walls.add(new CustomPlatform(this, 768, 0, 32, 568, "sand").setAngle(45));
    }

    update(time: number): void {
        if(!this.stopSpawn) {
            this.emitStar();
            this.stopSpawn = true;
        }
    }

    private emitStar(): void {
        var x = 500;
        var y = 60;
        var ball: Ball = new Ball(this, x, y,"star");

        ball.setDisplaySize(50, 50);
        ball.setVelocity(250, 0);
        ball.setInteractive();
        ball.setBounce(this.collisionFactor, this.collisionFactor);

        this.physics.add.collider(ball, this.walls);
    }
};
