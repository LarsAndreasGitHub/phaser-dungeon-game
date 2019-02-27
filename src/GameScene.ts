import { Scene } from 'phaser';
import { Board } from './Board';
import { GameStateObject } from './GameStateObject';
import { Direction, newGame } from './GameState/GameState';

export class GameScene extends Scene {
    constructor() {
        super({
            key: "GameScene"
        });
    }

    private ball: Phaser.GameObjects.Graphics = {} as Phaser.GameObjects.Graphics;
    private board: Board = {} as Board;
    private turnText: Phaser.GameObjects.Text = {} as Phaser.GameObjects.Text;
    private gameState: GameStateObject = {} as GameStateObject;

    preload() {
        // this.load.spritesheet("sprites", "assets/character_and_tileset/Dungeon_Tileset.png", { frameWidth: 16, frameHeight: 16});
    }

    create() {
        this.board = new Board(this, "board", 5, 16*30);
        this.gameState = new GameStateObject(this, "gameState", newGame());

        const gameWidth = this.sys.game.canvas.width;
        const gameHeight = this.sys.game.canvas.height;
        const xOffset = (gameWidth - this.board.length) / 2;
        const yOffset = (gameHeight - this.board.length) / 2;

        const graphicsLine = this.add.graphics({
            x: xOffset,
            y: yOffset,
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
        for (let i=0; i<= this.board.dimension; i++) {
            graphicsLine.strokeLineShape(new Phaser.Geom.Line(step*i, 0, step*i, length));
            graphicsLine.strokeLineShape(new Phaser.Geom.Line(0, step*i, length, step*i));
        }

        this.turnText = this.add.text(5, 5, "", { fill: '#0f0' });
        this.updateTurnText();

        this.createButton(5, 500, "right", () => this.gameState.moveBall(Direction.RIGHT));
        this.createButton(5, 550, "left", () => this.gameState.moveBall(Direction.LEFT));
        this.createButton(5, 600, "up", () => this.gameState.moveBall(Direction.UP));
        this.createButton(5, 650, "down", () => this.gameState.moveBall(Direction.DOWN));

        this.ball = graphicsCircle.fillCircle(0, 0, step/2 - 2);
        this.setBallPosition();
    }

    private createButton(x: number, y: number, text: string, onClick: () => any): Phaser.GameObjects.Text {
        const helloButton = this.add.text(x, y, text, { fill: '#0f0' });
        helloButton.setInteractive();
        helloButton.on('pointerdown', onClick);
        return helloButton;
    }

    private setBallPosition() {
        const gameWidth = this.sys.game.canvas.width;
        const gameHeight = this.sys.game.canvas.height;
        const xOffset = (gameWidth - this.board.length) / 2; // TODO: This is horrible
        const yOffset = (gameHeight - this.board.length) / 2;

        const ballPosition = this.gameState.state.ball.position;
        const {x, y} = this.board.getPixelPosition(ballPosition);
        this.ball.setPosition(x + xOffset, y + yOffset);

    }

    private updateTurnText() {
        this.turnText.setText("Turn: " + this.gameState.state.turn);
    }

    update() {
        const gameWidth = this.sys.game.canvas.width;
        const gameHeight = this.sys.game.canvas.height;
        const xOffset = (gameWidth - this.board.length) / 2; // TODO: This is horrible
        const yOffset = (gameHeight - this.board.length) / 2;

        const mousePos = this.board.getIndexOfPixelPosition({
            x: this.game.input.mousePointer.x - xOffset,
            y: this.game.input.mousePointer.y - yOffset,
        });
        console.log(mousePos);
        this.setBallPosition();
        this.updateTurnText();
    }
}
