import "phaser";

export class CustomPlateform extends Phaser.GameObjects.TileSprite {
    angle: number;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, texture: string) {
        super(scene, x, y, width, height, texture);

        this.setTexture(texture);
        scene.add.existing(this);
        this.setOrigin(0,0);
        scene.physics.add.existing(this, true);
    }
}