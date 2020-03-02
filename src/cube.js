import Zdog from 'zdog';
import { getMoves, getMove, quarter } from './moves';
import { Model, Cubies } from './cubies';

export default function({ illo, zoom, colors: colorsRGB, cubeColor }) {
    const distance = zoom * 38;

    const cube = {
        ...Model(),
        cubies: Cubies({ illo, config: { distance, zoom, cubeColor, colorsRGB } }),
        setCubieColors: (positions, type) => {
            for (let i = 0; i < positions.length; i++) {
                const index = positions[i];
                cube.cubies[type][index].setColors(cube[type][index]);
            }
        },
    };

    const queue = [];
    // let lastMove;

    return {
        // config = getters + object
        // cubie.destroy
        // undo cycle
        // combine axial { moves: [] }
        move: (move) => {
            // if (queue.length === 0 && lastMove) {
            //     lastMove.tween(0);
            // }
            queue.push(getMove(move, cube))
        },
        moves: (moves) => queue.push(...getMoves(moves, cube)),
        movesInstant: (moves) => {
            getMoves(moves, cube).forEach(move => move.apply());
        },
        render: () => {
            if (queue.length) {
                // const tps = Math.max(queue.length, 5);
                const tps = 4;
                const diff = 1000 / tps;

                const now = performance.now();
                const [move] = queue;
                if (!move.epoch) {
                    move.epoch = now;
                }
                const elapsed = now - move.epoch;
                if (elapsed > diff) {
                    move.apply();

                    // lastMove extra offset -> fix to axial
                    // if (queue.length === 1) {
                    //     move.tween(require('zdog').lerp(0, -0.02, Math.random()));
                    // }
                    // move.tweenClean()
                    // lastMove =
                        queue.shift();
                } else {
                    move.tween(elapsed / diff);
                }
            }
        },
    };
}
