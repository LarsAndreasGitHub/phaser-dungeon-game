import Phaser from 'phaser';
import {GameScene} from "./GameScene";

const config = {
    title: "Dungeon",
    width: 16*50,
    height: 16*50,
    pixelArt: true,
    type: Phaser.AUTO,
    parent: "game",
    scene: [GameScene],
    input: {
        keyboard: true,
        mouse: true,
        touch: false,
        gamepad: false
    },
    backgroundColor: "#000000"
};

window.onload = () => {
    const game = new Phaser.Game(config);
};