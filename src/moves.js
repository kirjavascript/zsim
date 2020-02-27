import { TAU } from 'zdog';

export const quarter = TAU / 4;
export const half = TAU / 2;

const moveList = {
    R: {
        edges: [[5, 9, 4, 1]],
        corners: [[5, 4, 0, 1], [-1, 1, -1, 1]],
        centre: 2,
        axis: 'x',
    },
    U: {
        edges: [[3, 2, 1, 0]],
        corners: [[3, 2, 1, 0]],
        centre: 0,
        axis: 'y',
    },
    F: {
        edges: [[6, 10, 5, 2], [1, 1, 1, 1]],
        corners: [[1, 2, 6, 5], [-1, 1, -1, 1]],
        axis: 'z',
    },
    L: {
        edges: [[3, 7, 11, 6]],
        corners: [[2, 3, 7, 6], [-1, 1, -1, 1]],
    },
    B: {
        edges: [[4, 8, 7, 0], [1, 1, 1, 1]],
        corners: [[4, 7, 3, 0], [-1, 1, -1, 1]],
    },
    D: {
        edges: [[8, 9, 10, 11]],
        corners: [[4, 5, 6, 7]],
    },
    M: {
        centres: [0, 1, 5, 3],
        edges: [[2, 0, 8, 10], [1, 1, 1, 1]],
    },
    E: {
        centres: [3, 4, 1, 2],
        edges: [[4, 5, 6, 7], [1, 1, 1, 1]],
    },
    S: {
        centres: [4, 5, 2, 0],
        edges: [[3, 11, 9, 1], [1, 1, 1, 1]],
    },
};

function getTransform() {

}

function getMove(moveRaw, cube) {
    const { move, order } = toObject(moveRaw);
    if (!moveList[move]) throw new Error(`invalid move ${move}`);
    const {
        corners: [corners, cornerTwists],
        edges: [edges, edgeTwists],
        centre,
        axis,
    } = moveList[move];

    // calculate transforms
    // const transforms = [
    //     ...corners.map(index => cube.corners[index]),
    //     ...edges.map(index => cube.edges[index]),
    //     cube.centres[centre],
    // ];



    function doCycle(arr, order, cycle, twists) {
        if (order === -1) {
            cycle = cycle.reverse();
            twists && (twists = twists.reverse());
        } else if (order === 2) {
            doCycle(arr, 1, cycle, twists);
        }

       // corner twists TODO: change
       if (twists) {
           for (let i = 0; i < twists.length; i++) {
               twist(arr, cycle[i], twists[i]);
           }
       }

        // cycles
        for (let i = 0; i < cycle.length - 1; i++) {
            swap(arr, cycle[i], cycle[i + 1]);
        }

        const [a, b] = ({
            z: [0, 1],
            y: [0, 2],
            x: [1, 2],
        }[axis]);

        // corner fix
        if (arr[0].length === 3) {
            for (let i = 0; i < cycle.length; i++) {

                swap(arr[cycle[i]], a, b);
            }
        }

    }

    function twist(arr, cubieIndex, order) {
        const cubie = arr[cubieIndex];
        // edges
        if (cubie.length == 2) {
            cubie.push(cubie.splice(0, 1)[0]);
        } else {
            //corners
            if (order === 1) {
                // cubie.splice(0, 0, cubie.splice(2, 1)[0]);
            } else if (order === -1) {
                // cubie.splice(2, 0, cubie.splice(0, 1)[0]);
            }
        }
    }

    function swap(arr, first, second) {
        const tmp = arr[first];
        arr[first] = arr[second];
        arr[second] = tmp;
    }

    doCycle(cube.edges, order, edges, edgeTwists);
    cube.setCubieColors(edges, 'edges');
    doCycle(cube.corners, order, corners, cornerTwists);
    cube.setCubieColors(corners, 'corners');

            // const [a, b, c] = cube.corners;
            // a.stickerElements.forEach((element, i) => {
            //     element.color = b.stickerElements[[0,2,1][i]].color
            // })

    // adjust places
    // doCycle(cube.edges, order, edges);
    // doCycle(cube.corners, order, corners);

    // generate solved state from cubies

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
            '3': -1,
            '': 1,
            '2': 2,
        }[move[1]],
    };
}

function splitMoves(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/\s/g,'').split(/(\w3|\w2|\w'|\w)/).filter((move) => move);
}

//function doCycle(arr, order, cycle, twists) {
//    if (order == -1) {
//        cycle = cycle.reverse();
//        twists && (twists = twists.reverse());
//    } else if (order == 2) {
//        doCycle(arr, 1, cycle, twists);
//    }
//    // corner twists
//    if (twists) {
//        for (let i = 0; i < twists.length; i++) {
//            twist(arr, cycle[i], twists[i]);
//        }
//    }

//    // cycles
//    for (let i = 0; i < cycle.length - 1; i++) {
//        swap(arr, cycle[i], cycle[i + 1]);
//    }
//}

//function swap(arr, first, second) {
//    const tmp = arr[first];
//    arr[first] = arr[second];
//    arr[second] = tmp;
//}

//function twist(arr, cubieIndex, order) {
//    const cubie = arr[cubieIndex];
//    // edges
//    if (cubie.length == 2) {
//        cubie.push(cubie.splice(0, 1)[0]);
//    } else {
//        //corners
//        if (order == 1) {
//            cubie.splice(0, 0, cubie.splice(2, 1)[0]);
//        } else if (order == -1) {
//            cubie.splice(2, 0, cubie.splice(0, 1)[0]);
//        }
//    }
//}
