abstract class GameObject {
    public type: ObjectType;
    public position: Position;

    protected constructor(type: ObjectType, position: Position) {
        this.type = type;
        this.position = position;
    }
}

interface Ball {
    position: Position;
}

enum ObjectType {
    ball,
    wall,
    ice,
}

export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

type Player = 'player1' | 'player2';

export interface Position {
    x: number;
    y: number;
}

export interface GameState {
    board: {
        length: number;
        height: number;
    };
    turn: Player;
    ball: Ball;
    // things: GameObject[];
}

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

    return {...state, ball: updatedBall};
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

export const newGame = (): GameState => {
    return {
        board: {
            length: 5,
            height: 5,
        },
        turn: 'player1',
        ball: {
            position: {
                x: 2,
                y: 2,
            }
        }
    };
}