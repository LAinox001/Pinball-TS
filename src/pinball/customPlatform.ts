import "phaser";

export class CustomPlatform extends Phaser.GameObjects.TileSprite {
    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, texture: string) {
        super(scene, x, y, width, height, texture);
        this.setTexture(texture);
        this.setOrigin(0,0);

        scene.add.existing(this);
        scene.physics.add.existing(this, true);
    }
}