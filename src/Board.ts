import { Position } from './GameState/GameState';

export class Board extends Phaser.GameObjects.GameObject {
    public dimension: number;
    public length: number;
    public stepLength: number;

    constructor(scene: Phaser.Scene, type: string, dimension: number, length: number) {
        super(scene, type);
        this.dimension = dimension;
        this.length = length;
        this.stepLength = length / dimension;
    }

    public getPixelPosition(position: Position) {
        return {
            x: (position.x + 0.5) * this.stepLength,
            y: (position.y + 0.5) * this.stepLength,
        }
    }
}