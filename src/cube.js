import Zdog from 'zdog';
import { getMoves, getMove, quarter } from './moves';
import { Model, Cubies } from './cubies';
import { hexToRgba } from './util';

export default function({ element, config }) {
    const zoom = 2;

    const alpha = 1;
    const colorsRGB = [
        '#ffffff',
        '#0045ad',
        '#b90000',
        '#009b48',
        '#ff5900',
        '#ffd500',
    ].map(color => hexToRgba(color, alpha));
    const cubeColor = hexToRgba('#814ED0', alpha); // rgb

    element.setAttribute('width', zoom * 400);
    element.setAttribute('height', zoom * 400);

    const illo = new Zdog.Illustration({
        element,
        zoom,
        dragRotate: true,
    });

    illo.rotate = { x: -.3, y: .3 }

    const queue = [];

    const clearQueue = () => queue.splice(0, queue.length).map(move => move.source);

    const cube = {
        ...Model(),
        cubies: Cubies({ illo, config: { zoom, cubeColor, colorsRGB } }),
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
            cube.cubies = Cubies({ illo, config: { zoom, cubeColor, colorsRGB } });
            cube.setAllCubies();
            if (queue.length) {
                const sources = clearQueue();
                const moves = getMoves(sources, cube);
                moves[0].epoch = sources[0].epoch;
                queue.push(...moves);
            }
        },
    };


    // move loop here

    return {
        // config = getters + object
        // cubie.destroy
        // move.invert()
        // combine axial { moves: [] }
        reset: cube.reset,
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
            if (queue.length !== 0) {
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
            illo.updateRenderGraph();
        },
    };
}
