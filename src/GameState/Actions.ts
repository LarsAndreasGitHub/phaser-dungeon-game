import { Ball, Direction, GameState, Player, Position } from './GameState';

interface SinglePushAction {
    player: Player;
    direction: Direction;
    position: Position;
}

export function singlePush(action: SinglePushAction, state: GameState) {
    const oldBall: Ball = state.ball;
    const direction = action.direction;

    let updatedBall = oldBall;
    if ((direction === Direction.UP) && (oldBall.position.x === action.position.x) && (oldBall.position.y > 0)) updatedBall = move(oldBall, Direction.UP);
    if ((direction === Direction.DOWN) && (oldBall.position.x === action.position.x) && (oldBall.position.y < state.board.length - 1)) updatedBall = move(oldBall, Direction.DOWN);
    if ((direction === Direction.LEFT) && (oldBall.position.y === action.position.y) && (oldBall.position.x > 0)) updatedBall = move(oldBall, Direction.LEFT);
    if ((direction === Direction.RIGHT) && (oldBall.position.y === action.position.y) && (oldBall.position.x < state.board.height - 1)) updatedBall = move(oldBall, Direction.RIGHT);

    return {...switchTurn(state), ball: updatedBall};
}

export function switchTurn(state: GameState): GameState {
    const newTurn: Player = state.turn === 'player1' ? 'player2' : 'player1';
    return {...state, turn: newTurn};
}

function move(ball: Ball, direction: Direction): Ball {
    const newBall = {...ball};
    if (direction === Direction.UP) newBall.position.y -= 1;
    if (direction === Direction.DOWN) newBall.position.y += 1;
    if (direction === Direction.LEFT) newBall.position.x -= 1;
    if (direction === Direction.RIGHT) newBall.position.x += 1;
    return newBall;
}

export const testAction = () => {
    const aGame: GameState = {
        board: {
            length: 5,
            height: 5,
        },
        turn: 'player1',
        ball: {
            position: {
                x: 3,
                y: 3,
            }
        }
    };

    const action: SinglePushAction = {
        player: 'player1',
        direction: Direction.UP,
        position: {
            x: 3,
            y: 0,
        }
    };

    const newState: GameState = singlePush(action, aGame);
    console.log(newState);
}