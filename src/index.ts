import Phaser from 'phaser';
import {LoadingScene} from "./LoadingScene";

const config = {
    title: "Dungeon",
    width: window.innerWidth,
    height: window.innerHeight,
    autoResize: true,
    pixelArt: true,
    type: Phaser.AUTO,
    parent: "game",
    scene: [LoadingScene],
    input: {
        keyboard: true,
        mouse: false,
        touch: false,
        gamepad: false
    },
    backgroundColor: "#000000"
};

window.onload = () => {
    const game = new Phaser.Game(config);
};