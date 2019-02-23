export class Board extends Phaser.GameObjects.GameObject {
    public dimension: number;
    public length: number;
    public stepLength: number;

    constructor(scene: Phaser.Scene, type: string, dimension: number, length: number) {
        super(scene, type);
        this.dimension = dimension;
        this.length = length;
        this.stepLength = length / dimension;
    }

    public getPosition(indX: number, indY: number) {
        return {
            x:  (indX + 0.5) * this.stepLength,
            y: (indY + 0.5) * this.stepLength,
        }
    }
}