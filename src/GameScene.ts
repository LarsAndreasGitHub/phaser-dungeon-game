import {CellType, GameChunk, getInitialChunk, iterateChunk} from "./maps/dungeon";
import {GameObjects, Scene} from 'phaser';

export class GameScene extends Scene {
    maxIterations: number;
    iteration: number;
    frame: number;
    chunk: GameChunk;
    sprites?: GameObjects.Group;

    constructor() {
        super({
            key: "GameScene"
        });
        this.maxIterations = 6;
        this.iteration = 0;
        this.frame = 0;
        this.chunk = getInitialChunk(50, 0.40);
    }

    preload() {
        this.load.spritesheet("sprites", "assets/character_and_tileset/Dungeon_Tileset.png", { frameWidth: 16, frameHeight: 16});
    }

    create() {
        this.sprites = this.add.group();
    }

    getSpriteNum(x: number, y: number): number {
        if (this.chunk[x][y] === CellType.SPACE) {
            return Math.floor(Math.random() * 4) + 6;
        }
        const wallAbove = y === 0 || this.chunk[x][y-1] === CellType.WALL;
        const wallLeft = x === 0 || this.chunk[x-1][y] === CellType.WALL;
        const wallBelow = y === this.chunk.length - 1 || this.chunk[x][y+1] === CellType.WALL;
        const wallRight = x === this.chunk.length - 1 || this.chunk[x+1][y] === CellType.WALL;

        if (wallAbove && wallLeft && wallBelow && wallRight) {
            return 78;
        }
        return 2;
    }

    update(time: number, delta: number) {
        if (this.frame++ % 100 !== 0 || this.iteration > this.maxIterations) {
            return;
        }

        this.iteration++;
        this.sprites!.clear(true);
        for (let x=0; x<this.chunk.length; x++) {
            for (let y=0; y<this.chunk.length; y++) {
                const spriteNum = this.getSpriteNum(x, y);
                const sprite = this.add.sprite(x*16, y*16, "sprites", spriteNum);
                sprite.setOrigin(0, 0);
                this.sprites!.add(sprite);
            }
        }
        this.chunk = iterateChunk(this.chunk, 3, 4);
    }
}
