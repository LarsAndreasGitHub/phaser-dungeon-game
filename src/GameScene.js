import {CellType, DungeonChunk, getInitialChunk, iterateChunk} from "./maps/dungeon";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: "GameScene"
        });
        this.chunk = getInitialChunk(80, 0.6);
        const iterations = 20;
        console.log("iterations used", iterations);
        for (let z=0; z<iterations; z++) {
            this.chunk = iterateChunk(this.chunk, 4, 3);
        }
    }

    init() {

    }

    create() {
        for (let x=0; x<this.chunk.length; x++) {
            for (let y=0; y<this.chunk.length; y++) {
                if (this.chunk[x][y] === CellType.WALL) {
                    const graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
                    graphics.fillRectShape(new Phaser.Geom.Rectangle(x*10, y*10, 10, 10));
                }
            }
        }

        console.log("this", this);
    }

    update(time, delta) {

    }
}
