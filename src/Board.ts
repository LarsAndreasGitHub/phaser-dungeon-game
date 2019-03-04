import { Position } from './GameState/GameState';

export interface PixelPosition {
    x: number;
    y: number;
}

export interface BoardPositioningConfig {
    position: PixelPosition;
    gameWidth: number;
    gameHeight: number;
}

export class Board extends Phaser.GameObjects.GameObject {
    public dimension: number;
    public length: number;
    public stepLength: number;
    public position: PixelPosition;

    constructor(
        scene: Phaser.Scene,
        type: string,
        dimension: number,
        length: number,
        position: PixelPosition,
    ) {
        super(scene, type);
        this.dimension = dimension;
        this.length = length;
        this.stepLength = length / dimension;
        this.position = position;
    }

    public getPixelPosition(position: Position) {
        return {
            x: this.position.x + (position.x + 0.5) * this.stepLength,
            y: this.position.y + (position.y + 0.5) * this.stepLength,
        }
    }

    public getIndexOfPixelPosition(pixelPosition: PixelPosition): Position | 'out-of-bounds' {
        const relativeX = pixelPosition.x - this.position.x;
        const relativeY = pixelPosition.y - this.position.y;

        const position: Position = {
            x: Math.floor(relativeX / this.stepLength),
            y: Math.floor(relativeY / this.stepLength),
        };
        const {x, y} = position;
        if ((x < 0) || (y < 0) || (x >= this.dimension) || (y >= this.dimension)) {
            return 'out-of-bounds';
        }
        return position;
    }
}