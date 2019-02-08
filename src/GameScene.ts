import {GameObjects, Scene} from 'phaser';

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
        const n = 6;
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

        const step = length / n;
        for (let i=0; i<=n; i++) {
            graphics.strokeLineShape(new Phaser.Geom.Line(step*i, 0, step*i, length));
            graphics.strokeLineShape(new Phaser.Geom.Line(0, step*i, length, step*i));

        }

        // graphics.strokeLineShape(new Phaser.Geom.Line(100, 100, 200, 200));
    }


    update(time: number, delta: number) {
    }
}
