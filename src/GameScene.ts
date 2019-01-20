import {CellType, GameChunk, getInitialChunk, iterateChunk} from "./maps/dungeon";
import {GameObjects, Scene} from 'phaser';

export class GameScene extends Scene {
    maxIterations: number;
    iteration: number;
    frame: number;
    chunk: GameChunk;
    backgroundGraphics?: GameObjects.Graphics;
    wallGraphics?: GameObjects.Graphics;

    constructor() {
        super({
            key: "GameScene"
        });
        this.maxIterations = 30;
        this.iteration = 0;
        this.frame = 0;
        this.chunk = getInitialChunk(80, 0.6);
    }

    create() {
        this.backgroundGraphics = this.add.graphics({ fillStyle: { color: 0x000000 } });
        this.wallGraphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
        this.backgroundGraphics.fillRectShape(new Phaser.Geom.Rectangle(0, 0, 800, 800));
    }

    update(time: number, delta: number) {
        if (this.frame++ % 30 !== 0 || this.iteration > this.maxIterations) {
            return;
        }

        this.iteration++;
        this.wallGraphics!.clear();
        for (let x=0; x<this.chunk.length; x++) {
            for (let y=0; y<this.chunk.length; y++) {
                if (this.chunk[x][y] === CellType.WALL) {
                    this.wallGraphics!.fillRectShape(new Phaser.Geom.Rectangle(x*10, y*10, 10, 10));
                }
            }
        }
        this.chunk = iterateChunk(this.chunk, 4, 3);
    }
}
