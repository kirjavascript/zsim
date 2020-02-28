import { TAU } from 'zdog';

export const quarter = TAU / 4;
export const half = TAU / 2;

const moveList = {
    R: {
        edges: [5, 9, 4, 1],
        corners: [5, 4, 0, 1],
        centre: 2,
        axis: 'x',
    },
    U: {
        edges: [3, 2, 1, 0],
        corners: [3, 2, 1, 0],
        centre: 0,
        axis: 'y',
    },
    F: {
        edges: [6, 10, 5, 2],
        corners: [1, 2, 6, 5],
        axis: 'z',
    },
    L: {
        edges: [3, 7, 11, 6],
        corners: [2, 3, 7, 6],
        axis: 'x',
    },
    B: {
        edges: [4, 8, 7, 0],
        corners: [4, 7, 3, 0],
        axis: 'z',
    },
    D: {
        edges: [8, 9, 10, 11],
        corners: [4, 5, 6, 7],
        axis: 'y',
    },
    M: {
        centres: [0, 1, 5, 3],
        edges: [2, 0, 8, 10],
        axis: 'x',
    },
    E: {
        centres: [3, 4, 1, 2],
        edges: [4, 5, 6, 7],
        axis: 'y',
    },
    S: {
        centres: [4, 5, 2, 0],
        edges: [3, 11, 9, 1],
        axis: 'z',
    },
};

const cornerSwaps = {
    z: [0, 1],
    y: [0, 2],
    x: [1, 2],
};

function getMove(moveRaw, cube) {
    const { move, order } = toObject(moveRaw);
    if (!moveList[move]) throw new Error(`invalid move ${move}`);
    const {
        corners,
        edges,
        centres,
        axis,
    } = moveList[move];

    // calculate transforms
    // const transforms = [
    //     ...corners.map(index => cube.corners[index]),
    //     ...edges.map(index => cube.edges[index]),
    //     cube.centres[centre],
    // ];

    // multiple moves at once


    if (edges) {
        // force axis as z if we have a slice move
        doCycle(cube.edges, order, edges, centres ? 'z' : axis);
        cube.setCubieColors(edges, 'edges');
    }
    if (centres) {
        doCycle(cube.centres, order, centres, axis);
        cube.setCubieColors(centres, 'centres');
    }
    if (corners) {
        doCycle(cube.corners, order, corners, axis);
        cube.setCubieColors(corners, 'corners');
    }


    function apply() {
        transforms.forEach(({ anchor }) => {
            // anchor.rotate[axis] += quarter;
            // apply
            // run cubies, swap colours
            // resetting rotate makes animations easier
        });

    }

    // apply
    // calc finalvalue
    // lerp moves
    // list of cubies to update each cube with the update
    // transforms
    return {
        apply,
    };
}

export function getMoves(moves, cube) {
    return splitMoves(moves).map(move => getMove(move, cube));
}

function toObject(move) {
    if (typeof move !== 'string') return move;
    return {
        move: move[0],
        order: {
            '\'': -1,
            '3': 3,
            '2': 2,
        }[move[1]] || 1,
    };
}

function splitMoves(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/\s/g,'').split(/(\w3|\w2|\w'|\w)/).filter((move) => move);
}

function doCycle(arr, order, cycle, axis) {
    if (order === -1 || order === 3) {
        cycle = [...cycle].reverse();
    } else if (order === 2) {
        doCycle(arr, 1, cycle, axis);
    }

    // cycles
    for (let i = 0; i < cycle.length - 1; i++) {
        swap(arr, cycle[i], cycle[i + 1]);
    }

    // corner 'twists'
    if (arr[0].length === 3) {
        for (let i = 0; i < cycle.length; i++) {
            swap(arr[cycle[i]], ...cornerSwaps[axis]);
        }
    }
    // edge flips
    else if (axis === 'z') {
        for (let i = 0; i < cycle.length; i++) {
            swap(arr[cycle[i]], 0, 1);
        }
    }
}

function swap(arr, first, second) {
    const tmp = arr[first];
    arr[first] = arr[second];
    arr[second] = tmp;
}
