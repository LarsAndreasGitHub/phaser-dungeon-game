import { Position } from './GameState/GameState';

export interface PixelPosition {
    x: number;
    y: number;
}

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

    public getIndexOfPixelPosition(pixelPosition: PixelPosition): Position | 'out-of-bounds' {
        const position: Position = {
            x: Math.floor(pixelPosition.x / this.stepLength),
            y: Math.floor(pixelPosition.y / this.stepLength),
        };
        const {x, y} = position;
        if ((x < 0) || (y < 0) || (x >= this.dimension) || (y >= this.dimension)) {
            return 'out-of-bounds';
        }
        return position;
    }
}