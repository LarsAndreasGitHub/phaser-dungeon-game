import Phaser from 'phaser';
import {GameScene} from "./GameScene";

const config = {
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
    constructor(config) {
        super(config);
    }
}

window.onload = () => {
    var game = new Game(config);
};