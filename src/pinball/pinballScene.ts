import "phaser";
import B = Phaser.Input.Keyboard.KeyCodes.B;
import {Ball} from "./ball";

export class PinballScene extends Phaser.Scene {
    delta: number;
    lastStarTime: number;
    starsCaught: number;
    starsFallen: number;
    sand: Phaser.Physics.Arcade.StaticGroup;
    info: Phaser.GameObjects.Text;
    stopSpawn: boolean = false;
    yVeloBeforeCollision: number;

    constructor() {
        super({
            key: "PinballScene"
        });
    }

    init(params: any): void {
        this.delta = 1000;
        this.lastStarTime = 0;
        this.starsCaught = 0;
        this.starsFallen = 0;
    }

    preload(): void {
        this.load.setBaseURL("https://raw.githubusercontent.com/mariyadavydova/" +
            "starfall-phaser3-typescript/master/");
        this.load.image("star", "assets/star.png");
        this.load.image("sand", "assets/sand.jpg");
    }

    create(): void {
        this.sand = this.physics.add.staticGroup({
            key: 'sand',
            frameQuantity: 20
        });
        Phaser.Actions.PlaceOnLine(this.sand.getChildren(),
            new Phaser.Geom.Line(20, 580, 820, 580));
        this.sand.refresh();
    }

    update(time: number): void {
        if(!this.stopSpawn) {
            this.emitStar();
            this.stopSpawn = true;
        }
    }

    private emitStar(): void {
        var x = Phaser.Math.Between(25, 775);
        var y = 26;
        // var ball: Ball = new Ball(this, x, y , "star");
        var ball: Phaser.Physics.Arcade.Image;
        ball = this.physics.add.image(x, y, "star");

        ball.setDisplaySize(50, 50);
        ball.setVelocity(0, 200);
        ball.setInteractive();

        this.physics.add.collider(ball, this.sand, this.onFall(ball), this.beforeCollision(ball), this);
    }

    private onFall(ball): () => void {
        return function () {
            ball.setVelocityY(this.yVelocityBeforeCollision < 1 ? 0 : this.yVelocityBeforeCollision * -0.6);
        }
    }

    private beforeCollision(ball): () => void {
        return function () {
            this.yVelocityBeforeCollision = ball.body.velocity.y;
        }
    }
};
