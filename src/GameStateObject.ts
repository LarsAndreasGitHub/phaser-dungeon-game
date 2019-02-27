import { Direction, GameState, Position} from './GameState/GameState';
import { singlePush } from './GameState/Actions';

export class GameStateObject extends Phaser.GameObjects.GameObject {
    public state: GameState;

    constructor(scene: Phaser.Scene, type: string, state: GameState) {
        super(scene, type);
        this.state = state;
    }

    public moveBall(direction: Direction) {
        this.state = singlePush({
            player: 'player1',
            direction: direction,
            position: this.state.ball.position,
        }, this.state);
    }
}