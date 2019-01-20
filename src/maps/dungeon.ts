export enum CellType {
    WALL, SPACE
}

export type GameChunk = CellType[][];

export function getInitialChunk(size: number, wallChance: number): GameChunk {
    const map = [];
    for (let x=0; x<size; x++) {
        const row = [];
        for (let y=0; y<size; y++) {
           row.push(Math.random() <= wallChance ? CellType.SPACE : CellType.WALL);
        }
        map.push(row);
    }
    return map;
}

export function iterateChunk(chunk: GameChunk, birthLimit: number, deathLimit: number): GameChunk {
    return chunk.map((row, x) => row.map((cell, y) => {
        const wallsAround = getNumWallsAroundCell(chunk, x, y);
        if (wallsAround > deathLimit) {
            return CellType.SPACE;
        } else if(wallsAround < birthLimit) {
            return CellType.WALL;
        }
        return cell;
    }));
}

function getNumWallsAroundCell(chunk: GameChunk, x: number, y: number) {
    let numWalls = 0 ;
    for (let x2 = x-1; x2 <= x+1; x2++) {
        for (let y2 = y-1; y2 <= y+1; y2++) {
            if (x2 < 0 || x2 >= chunk.length || y2 < 0 || y2 >= chunk.length) {
                numWalls += 0.5;
            } else if(chunk[x2][y2] === CellType.WALL) {
                numWalls += 1;
            }
        }
    }
    return numWalls;
}