import {GameObjects, Scene} from 'phaser';
import { Board } from './Board';
import { testAction } from './GameState';

export class GameScene extends Scene {
    constructor() {
        super({
            key: "GameScene"
        });
    }

    preload() {
        // this.load.spritesheet("sprites", "assets/character_and_tileset/Dungeon_Tileset.png", { frameWidth: 16, frameHeight: 16});
    }

    create() {
        const n = 5;
        const length = 16*30;

        const graphics = this.add.graphics({
            x: 0,
            y: 0,
            lineStyle: {
                width: 4,
                color: 0xffffff,
                alpha: 1
            }
        });

        const graphicsCircle = this.add.graphics({
            x: 0,
            y: 0,
            lineStyle: {
                width: 4,
                color: 0xff0000,
                alpha: 1
            },
            fillStyle: {
                color: 0xff0000,
                alpha: 1
            },
        });

        testAction();

        const step = length / n;
        for (let i=0; i<=n; i++) {
            graphics.strokeLineShape(new Phaser.Geom.Line(step*i, 0, step*i, length));
            graphics.strokeLineShape(new Phaser.Geom.Line(0, step*i, length, step*i));
        }

        graphicsCircle.fillCircle(2.5*step, 2.5*step, step/2);
    }


    update(time: number, delta: number) {
    }
}
