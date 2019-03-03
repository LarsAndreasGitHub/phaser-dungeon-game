import { Position } from './GameState/GameState';

export class Tile extends Phaser.GameObjects.GameObject {
    private position: Position;

    constructor(scene: Phaser.Scene, position: Position) {
        super(scene, "tile");
        this.position = position;
    }

    create() {

    }
}
