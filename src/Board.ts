import "phaser";
import GameObject = Phaser.GameObjects.GameObject;

export class Board extends GameObject {
    n: number;
    length: number;

    constructor(scene: Phaser.Scene, type: string, n: number, length: number) {
        super(scene, type);
        this.n = n;
        this.length = length;
    }
}