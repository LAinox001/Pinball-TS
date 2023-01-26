import "phaser";

export class PinballScene extends Phaser.Scene {

    constructor() {
        super({
            key: "PinballScene"
        });
    }

    init(params: any): void {
    }

    preload(): void {
        this.load.image("ball", "assets/ball.png");
        this.load.image("sand", "assets/sand.jpg");
    }

    create(): void {
        let ball = this.matter.add.image(50, 0, "ball");
        ball.setBody({
            type: 'circle'
        });

        ball.setDisplaySize(50, 50);
        ball.setFriction(0.001);
        ball.setBounce(0.7);
        ball.setVelocityX(1);
        ball.setAngularVelocity(0);

        var ground = this.matter.add.image(400, 400, 'sand');
        ground.setStatic(true);
        ground.setScale(800, 0.5);
        ground.setAngle(10);
        ground.setFriction(0.005);
    }

    update(time: number): void {

    }

    private emitStar(): void {

    }
};
