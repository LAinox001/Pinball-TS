import "phaser";

export class Ball extends Phaser.Physics.Arcade.Image {
    yVelocityBeforeCollision: number = 0;
    xVelocityBeforeCollision: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.setTexture(texture);

        scene.physics.world.enable(this);
        scene.add.existing(this);
    }
}