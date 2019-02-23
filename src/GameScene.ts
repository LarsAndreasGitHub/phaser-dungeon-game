import { Scene } from 'phaser';
import { Board } from './Board';

export class GameScene extends Scene {
    constructor() {
        super({
            key: "GameScene"
        });
    }

    private ball: Phaser.GameObjects.Graphics = {} as Phaser.GameObjects.Graphics;
    private board: Board = {} as Board;

    preload() {
        // this.load.spritesheet("sprites", "assets/character_and_tileset/Dungeon_Tileset.png", { frameWidth: 16, frameHeight: 16});
    }

    create() {
        this.board = new Board(this, "board", 5, 16*30);

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

        const step = this.board.stepLength;
        const length = this.board.length;
        for (let i=0; i<=this.board.dimension; i++) {
            graphics.strokeLineShape(new Phaser.Geom.Line(step*i, 0, step*i, length));
            graphics.strokeLineShape(new Phaser.Geom.Line(0, step*i, length, step*i));
        }

        this.ball = graphicsCircle.fillCircle(0, 0, step/2);
        const {x, y} = this.board.getPosition(2, 2);
        this.ball.setPosition(x, y);

        const helloButton = this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
        helloButton.setInteractive();
        helloButton.on('pointerdown', () => this.move());
    }

    move() {
        const {x, y} = this.board.getPosition(3, 2);
        this.ball.setPosition(x, y);
    }

    update(time: number, delta: number) {
    }
}
