import Phaser from 'phaser';
import {GameScene} from "./GameScene";

const config: GameConfig = {
    title: "Dungeon",
    width: 800,
    height: 800,
    type: Phaser.AUTO,
    parent: "game",
    scene: [GameScene],
    input: {
        keyboard: true,
        mouse: false,
        touch: false,
        gamepad: false
    },
    backgroundColor: "#000000"
};

export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

window.onload = () => {
    const game = new Game(config);
};