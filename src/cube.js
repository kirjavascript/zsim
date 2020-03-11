import Zdog from 'zdog';
import { getMoves, getMove } from './moves';
import { Model, Cubies } from './cubies';
import { defaults, reactive } from './config';

export default function({ element, config: originalConfig }) {
    const config = defaults(originalConfig);
    const { zoom, rotate } = config;

    element.setAttribute('width', zoom * 400);
    element.setAttribute('height', zoom * 400);

    const illo = new Zdog.Illustration({
        element,
        zoom,
        dragRotate: true,
        rotate,
    });

    const queue = [];

    const clearQueue = () => queue.splice(0, queue.length).map(move => move.source);

    const cube = {
        ...Model(),
        cubies: Cubies({ illo, config }),
        setCubieColors: (positions, type) => {
            for (let i = 0; i < positions.length; i++) {
                const index = positions[i];
                cube.cubies[type][index].setColors(cube[type][index]);
            }
        },
        reset: () => {
            Object.assign(cube, Model());
            cube.setAllCubies();
            if (queue.length) {
                queue[0].tween(0);
                clearQueue();
            }
        },
        setAllCubies: () => {
            cube.setCubieColors([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 'edges');
            cube.setCubieColors([0, 1, 2, 3, 4, 5, 6, 7], 'corners');
            cube.setCubieColors([0, 1, 2, 3, 4, 5], 'centres');
        },
        reload: () => {
            cube.cubies.edges.forEach(edge => edge.destroy());
            cube.cubies.corners.forEach(corner => corner.destroy());
            cube.cubies.centres.forEach(centre => centre.destroy());
            cube.cubies = Cubies({ illo, config });
            cube.setAllCubies();
            if (queue.length) {
                const sources = clearQueue();
                const moves = getMoves(sources, cube);
                moves[0].epoch = sources[0].epoch;
                queue.push(...moves);
            }
        },
    };

    // TODO: move loop here

    // API

    return reactive(config, {
        onChange: (_key) => cube.reload(),
        // preload for element width/ height, illo rotate
        // moveProcessing: crushAxial|expand
        // combine axial { moves: [] }
        // move.invert()
        // animation spring for moves
        reset: cube.reset,
        move: (move) => {
            queue.push(getMove(move, cube))
        },
        moves: (moves) => queue.push(...getMoves(moves, cube)),
        movesInstant: (moves) => {
            getMoves(moves, cube).forEach(move => move.apply());
        },
        render: () => {
            if (queue.length !== 0) {
                const diff = 1000 / config.tps;
                const now = performance.now();

                const [move] = queue;
                // const { axis } = move;

                // for (let i = 0; i < queue.length; i++) {
                //     const move = queue[i]
                //     if (move.axis !== axis) break;
                //     if (!move.epoch) {
                //         move.epoch = now;
                //     }
                //     const elapsed = now - move.epoch;
                //     if (elapsed > diff && i === 0) {
                //         move.apply();
                //         queue.shift();
                //     } else {
                //         move.tween(elapsed / diff);
                //     }
                // }

                if (!move.epoch) {
                    move.epoch = now;
                }
                const elapsed = now - move.epoch;
                if (elapsed > diff) {
                    move.apply();
                    queue.shift();
                } else {
                    move.tween(elapsed / diff);
                }
            }
            illo.updateRenderGraph();
        },
    });
}
