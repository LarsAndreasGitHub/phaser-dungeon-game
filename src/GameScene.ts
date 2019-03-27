import { Scene } from 'phaser';
import { Board } from './Board';
import { GameStateObject } from './GameStateObject';
import { Direction, newGame, Position } from './GameState/GameState';

export class GameScene extends Scene {
    constructor() {
        super({
            key: "GameScene"
        });
    }

    private ball: Phaser.GameObjects.Sprite = {} as Phaser.GameObjects.Sprite;
    private board: Board = {} as Board;
    private turnText: Phaser.GameObjects.Text = {} as Phaser.GameObjects.Text;
    private gameState: GameStateObject = {} as GameStateObject;
    private tileGroup: Phaser.GameObjects.Group = {} as Phaser.GameObjects.Group;
    private selectedTiles: Position[] = [{x: 0, y: 0}];

    preload() {
        this.load.spritesheet("tileSprite", "assets/tiles.png", { frameWidth: 96, frameHeight: 96});
        this.load.spritesheet("ballSprite", "assets/ball.png", { frameWidth: 96, frameHeight: 96});
    }

    create() {
        // pikselmanipulering: https://www.piskelapp.com

        const gameWidth = this.sys.game.canvas.width;
        const gameHeight = this.sys.game.canvas.height;

        const dimension = 5;
        const tileSpriteLength = 96;
        const boardLength = dimension*tileSpriteLength;

        this.board = new Board(
            this,
            "board",
            dimension,
            boardLength,
            {x: (gameWidth - boardLength) / 2, y: (gameHeight - boardLength) / 2}
        );
        this.gameState = new GameStateObject(this, "gameState", newGame());

        /*
        this.anims.create({
            key: 'normal',
            frames: [ { key: 'tileSprite', frame: 0 } ]
        });

        this.anims.create({
            key: 'selected',
            frames: [ { key: 'tileSprite', frame: 1 } ]
        });
*       */

        this.tileGroup = this.add.group({
            classType: Phaser.GameObjects.Sprite,
            active: true,
            maxSize: -1,
            runChildUpdate: false,
        });

        for (let i=0; i<5; i++) {
            for (let j=0; j<5; j++) {
                this.tileGroup.createMultiple([{
                    key: 'tileSprite',
                    frame: 1,
                    setXY: this.board.getPixelPosition({x: i, y: j})
                }]);
            }
        }

        this.turnText = this.add.text(5, 5, "", { fill: '#0f0' });
        this.updateTurnText();

        this.createButton(5, 500, "right", () => {
            this.gameState.moveBall(Direction.RIGHT);
            this.gameState.addAction({type: "move-right", data: {}});
        });
        this.createButton(5, 550, "left", () => {
            this.gameState.moveBall(Direction.LEFT);
            this.gameState.addAction({type: "move-left", data: {}});
        });
        this.createButton(5, 600, "up", () => {
            this.gameState.moveBall(Direction.UP);
            this.gameState.addAction({type: "move-up", data: {}});
        });
        this.createButton(5, 650, "down", () => {
            this.gameState.moveBall(Direction.DOWN);
            this.gameState.addAction({type: "move-down", data: {}});
        });

        this.ball = this.add.sprite(0, 0, "ballSprite", 0);
        this.ball.setDepth(1);

        this.setBallPosition();
    }

    private createButton(x: number, y: number, text: string, onClick: () => any): Phaser.GameObjects.Text {
        const helloButton = this.add.text(x, y, text, { fill: '#0f0' });
        helloButton.setInteractive();
        helloButton.on('pointerdown', onClick);
        return helloButton;
    }

    private setBallPosition() {
        const ballPosition = this.gameState.state.ball.position;
        const {x, y} = this.board.getPixelPosition(ballPosition);
        this.ball.setPosition(x, y);
    }

    private updateTurnText() {
        this.turnText.setText("Turn: " + this.gameState.state.turn);
    }

    private setSelectedTiles(tiles: Position[]): void {
        this.selectedTiles = tiles;
    }

    private getTile(position: Position): Phaser.GameObjects.Sprite {
        const pixelPosition = this.board.getPixelPosition(position);
        return this.tileGroup.get(pixelPosition.x, pixelPosition.y);
    }

    private drawSelectedTiles() {
        const positions = this.board.getAllPositions();

        positions
            .filter(position => !this.selectedTilesIncludes(position))
            .map(position => this.getTile(position))
            .forEach(tile => tile.setTexture("tileSprite", 0));

        positions
            .filter(position => this.selectedTilesIncludes(position))
            .map(position => this.getTile(position))
            .forEach(tile => tile.setTexture("tileSprite", 1));
    }

    private selectedTilesIncludes(position: Position): boolean {
        return this.selectedTiles.filter(pos => pos.x === position.x && pos.y === position.y).length > 0;
    }

    preupdate() {
        // do heavy operations here
    }

    update() {
        // only do simple operations here

        const mousePos = this.board.getIndexOfPixelPosition({
            x: this.game.input.mousePointer.x,
            y: this.game.input.mousePointer.y,
        });

        if (mousePos !== 'out-of-bounds') {
            this.setSelectedTiles([mousePos]);
        } else {
            this.setSelectedTiles([]);
        }

        this.updateTurnText();
        this.drawSelectedTiles();
        this.setBallPosition();
    }
}
