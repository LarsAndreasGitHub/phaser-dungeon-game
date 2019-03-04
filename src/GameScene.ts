import { Scene } from 'phaser';
import { Board } from './Board';
import { GameStateObject } from './GameStateObject';
import { Direction, newGame} from './GameState/GameState';

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
        this.load.spritesheet("tileSprite", "assets/tiles.png", { frameWidth: 96, frameHeight: 96});
    }

    create() {
        this.board = new Board(this, "board", 5, 5*96);
        this.gameState = new GameStateObject(this, "gameState", newGame());

        const gameWidth = this.sys.game.canvas.width;
        const gameHeight = this.sys.game.canvas.height;

        const dim = {
            gameWidth: gameWidth,
            gameHeight: gameHeight,
            xOffset: (gameWidth - 5*96) / 2,
            yOffset: (gameHeight - this.board.length) / 2,
        };

        this.anims.create({
            key: 'normal',
            frames: [ { key: 'tileSprite', frame: 0 } ]
        });

        this.anims.create({
            key: 'selected',
            frames: [ { key: 'tileSprite', frame: 1 } ]
        });

        const tileGroup: Phaser.GameObjects.Group = this.add.group({
            classType: Phaser.GameObjects.Sprite,
            active: true,
            maxSize: -1,
            runChildUpdate: false,
        });

        for (let i=0; i<5; i++) {
            for (let j=0; j<5; j++) {
                const pos = this.board.getPixelPosition({x: i, y: j});
                tileGroup.createMultiple([{ key: 'tileSprite', frame: 0, setXY: {
                    x: pos.x + dim.xOffset,
                    y: pos.y + dim.yOffset
                }}]);
            }
        }

        const tmpPos = this.board.getPixelPosition({x: 0, y: 0});
        const child = tileGroup.get(
            tmpPos.x + dim.xOffset,
            tmpPos.y + dim.yOffset
        );
        child.anims.play('selected');

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

        this.turnText = this.add.text(5, 5, "", { fill: '#0f0' });
        this.updateTurnText();

        this.createButton(5, 500, "right", () => this.gameState.moveBall(Direction.RIGHT));
        this.createButton(5, 550, "left", () => this.gameState.moveBall(Direction.LEFT));
        this.createButton(5, 600, "up", () => this.gameState.moveBall(Direction.UP));
        this.createButton(5, 650, "down", () => this.gameState.moveBall(Direction.DOWN));

        this.ball = graphicsCircle.fillCircle(0, 0, this.board.stepLength/2 - 2);
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
        this.setBallPosition();
        this.updateTurnText();
    }
}
