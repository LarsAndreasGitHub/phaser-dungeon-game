export enum CellType {
    WALL, SPACE
}

export type GameChunk = CellType[][];

export function getInitialChunk(size: number, wallChance: number): GameChunk {
    const map = [];
    for (let x=0; x<size; x++) {
        const row = [];
        for (let y=0; y<size; y++) {
           row.push(Math.random() <= wallChance ? CellType.WALL : CellType.SPACE);
        }
        map.push(row);
    }
    return map;
}

export function iterateChunk(chunk: GameChunk, birthLimit: number, deathLimit: number): GameChunk {
    return chunk.map((row, x) => row.map((cell, y) => {
        const wallsAround = getNumWallsAroundCell(chunk, x, y);
        if (wallsAround < deathLimit) {
            return CellType.SPACE;
        } else if(wallsAround > birthLimit) {
            return CellType.WALL;
        }
        return cell;
    }));
}

function getNumWallsAroundCell(chunk: GameChunk, x: number, y: number) {
    const cords = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    return cords.map(([dx, dy]) => {
        const x2 = x+dx;
        const y2 = y+dy;
        if (x2 < 0 || x2 >= chunk.length || y2 < 0 || y2 >= chunk.length) {
            return 0.5;
        }
        return chunk[x2][y2] === CellType.WALL ? 1 : 0;
    }).reduce((agg: number, curr: number) => agg+curr, 0);
}