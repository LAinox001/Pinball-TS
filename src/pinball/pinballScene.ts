import "phaser";
import {Ball} from "./ball";
import * as math from 'mathjs';
import {CustomPlateform} from "./customPlateform";

export class PinballScene extends Phaser.Scene {
    ground: Phaser.GameObjects.TileSprite;
    leftWall: Phaser.GameObjects.TileSprite;
    rightWall: Phaser.GameObjects.TileSprite;
    formerRightWall: Phaser.GameObjects.TileSprite;
    ceiling: Phaser.GameObjects.TileSprite;
    info: Phaser.GameObjects.Text;
    stopSpawn: boolean = false;
    formerLeftWall: Phaser.GameObjects.TileSprite;
    readonly collisionFactor: number = 0.7;
    formerGround: Phaser.GameObjects.TileSprite;

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
        // this.sand = this.physics.add.staticGroup({
        //     key: 'sand',
        //     frameQuantity: 20
        // });
        // Phaser.Actions.PlaceOnLine(this.sand.getChildren(),
        //     new Phaser.Geom.Line(0, 0, 500, 600));
        // this.sand.refresh();

        this.ceiling = new CustomPlateform(this, 0, 0, 800, 32, "sand").setOrigin(0,0);
        this.ceiling.angle = 0;
        this.physics.add.existing(this.ceiling, true);

        this.ground = new CustomPlateform(this, 0, 568, 800, 32, "sand").setOrigin(0,0);
        this.ground.angle = 0;

        this.formerGround = this.add.tileSprite(0, 568, 800, 32, "sand").setOrigin(0,0);
        this.physics.add.existing(this.formerGround, true);

        this.leftWall = new CustomPlateform(this, 0, 0, 32, 568, "sand").setOrigin(0,0);
        this.leftWall.angle = 90;
        this.physics.add.existing(this.leftWall, true);

        this.formerLeftWall = this.add.tileSprite(0, 0, 32, 568, "sand").setOrigin(0,0);
        this.physics.add.existing(this.formerLeftWall, true);

        this.rightWall = new CustomPlateform(this, 768, 0, 32, 568, "sand").setOrigin(0,0);
        this.rightWall.angle = 90;

        this.formerRightWall = this.add.tileSprite(768, 0, 32, 568, "sand").setOrigin(0,0);
        this.physics.add.existing(this.formerRightWall, true);
    }

    update(time: number): void {
        if(!this.stopSpawn) {
            this.emitStar();
            this.stopSpawn = true;
        }
    }

    private emitStar(): void {
        var x = 400;
        var y = 70;
        var ball: Ball = new Ball(this, x, y,"star");
        var formerBall: Ball = new Ball(this, x, y,"sand");

        ball.setDisplaySize(50, 50);
        ball.setVelocity(600, 0);
        ball.setInteractive();

        formerBall.setDisplaySize(50, 50);
        formerBall.setVelocity(600, 0);
        formerBall.setInteractive();

        this.physics.add.collider(ball, this.ground, this.onGroundCeiling(ball, this.ground), this.beforeCollision(ball), this);
        this.physics.add.collider(ball, this.leftWall, this.onWall(ball, this.leftWall), this.beforeCollision(ball), this);
        this.physics.add.collider(ball, this.ceiling, this.onGroundCeiling(ball, this.ceiling), this.beforeCollision(ball), this);
        this.physics.add.collider(ball, this.rightWall, this.onWall(ball, this.rightWall), this.beforeCollision(ball), this);

        this.physics.add.collider(formerBall, this.formerGround, this.onFormerGroundCeiling(formerBall), this.beforeCollision(formerBall), this);
        this.physics.add.collider(formerBall, this.formerRightWall, this.onFormerWall(formerBall), this.beforeCollision(formerBall), this);
        this.physics.add.collider(formerBall, this.formerLeftWall, this.onFormerWall(formerBall), this.beforeCollision(formerBall), this);
    }

    private onGroundCeiling(ball: Ball, plateform: CustomPlateform): () => void {
        let _this = this;
        return function () {
            let velocityMatrix = _this.calculateCollisionVelocity(ball, plateform);
            ball.setVelocity(velocityMatrix.get([0,0])*_this.collisionFactor, velocityMatrix.get([1,0])*_this.collisionFactor);
        }
    }

    private onFormerGroundCeiling(ball): () => void {
        let _this = this;
        return function () {
            ball.setVelocityY(Math.abs(ball.yVelocityBeforeCollision) < 1 ? 0 : ball.yVelocityBeforeCollision * -_this.collisionFactor);
        }
    }

    private onWall(ball, plateform: CustomPlateform): () => void {
        let _this = this;
        return function () {
            let velocityMatrix = _this.calculateCollisionVelocity(ball, plateform);
            ball.setVelocity(velocityMatrix.get([0,0]) * _this.collisionFactor, velocityMatrix.get([1,0]) * _this.collisionFactor);
        }
    }
    private onFormerWall(ball): () => void {
        let _this = this;
        return function () {
            ball.setVelocityX(Math.abs(ball.xVelocityBeforeCollision) < 1 ? 0 : ball.xVelocityBeforeCollision * -_this.collisionFactor);
        }
    }

    private beforeCollision(ball): () => void {
        return function () {
            ball.yVelocityBeforeCollision = ball.body.velocity.y;
            ball.xVelocityBeforeCollision = ball.body.velocity.x;
        }
    }

    public calculateCollisionVelocity(ball: Ball, plateform: CustomPlateform): math.Matrix {
        // TODO teta est l'angle de la plateforme par rapport à l'axe x (en radians) (voir si faut pas le mutliplier par -1)
        let teta = plateform.angle * (math.pi/180);

        let rTetaMatrix = math.matrix([[Math.cos(teta), -Math.sin(teta)],
            [Math.sin(teta), Math.cos(teta)]]);
        let rTetaMinusMatrix = math.matrix([[Math.cos(-teta), -Math.sin(-teta)],
            [Math.sin(-teta), Math.cos(-teta)]]);

        let collisionMatrix = math.matrix([[1, 0],
            [0, -1]]);
        let velocityMatrix = math.matrix([[ball.xVelocityBeforeCollision], [ball.yVelocityBeforeCollision]]);

        let outputMatrix = math.multiply(math.multiply(rTetaMinusMatrix, collisionMatrix), math.multiply(rTetaMatrix, velocityMatrix));
        return outputMatrix;
    }
};
