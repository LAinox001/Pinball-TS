import "phaser";

export class Ball extends Phaser.Physics.Arcade.Image {
    yVelocityBeforeCollision: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
        console.log(scene.textures.list);
        super(scene, x, y, scene.textures.get("star"));
        scene.physics.add.existing(this);
    }
}