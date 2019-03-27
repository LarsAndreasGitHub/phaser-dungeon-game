import { Action } from './Actions';

export interface Ball {
    position: Position;
}

export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

export type Player = 'player1' | 'player2';

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
    actions: Action[];
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
        },
        actions: [],
    };
}