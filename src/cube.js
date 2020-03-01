import Zdog from 'zdog';
import { getMoves, getMove, quarter } from './moves';

// TODO: destroy -> return stickers
// TODO: generate getters for config

export default function({ illo, zoom, colors: colorsRGB, cubeColor }) {
    const distance = zoom * 38;

    function Cubie({ stickers }) {
        const anchor = new Zdog.Anchor({ addTo: illo });

        // infer position from cube stickers, because why not
        const translate = stickers.reduce((acc, { offset, axis }) => {
            acc[axis] = distance * offset;
            return acc;
        }, {});

        const container = new Zdog.Anchor({
            addTo: anchor,
            translate,
        });

        const size = zoom * 36;
        new Zdog.Box({
            addTo: container,
            width: size,
            height: size,
            depth: size,
            stroke: false,
            color: cubeColor,
        });

        const stickerOffset = (size / 2) + 1;
        const rotations = {
            x: { y: quarter },
            y: { x: quarter },
        };

        const stickerElements = stickers.map(({ color, axis, offset }) => {
            const stickerEl = new Zdog.Rect({
                addTo: container,
                width: size * 0.9,
                height: size * 0.9,
                stroke: 2,

                fill: true,
                color: colorsRGB[color],
                rotate: rotations[axis],
            });

            stickerEl.translate[axis] += stickerOffset * offset;
            return stickerEl;
        });

        return {
            anchor,
            stickers,
            setColors: (colors) => {
                for (let i = 0; i < stickerElements.length; i++) {
                    const color = colors[i];
                    stickerElements[i].color = colorsRGB[color];
                    stickers[i].color = color;
                }
            },
        };
    }

    const centres = [
        Cubie({ stickers: [ { color: 0, axis: 'y', offset: -1 } ] }),
        Cubie({ stickers: [ { color: 1, axis: 'z', offset: -1 } ] }),
        Cubie({ stickers: [ { color: 2, axis: 'x', offset: 1 } ] }),
        Cubie({ stickers: [ { color: 3, axis: 'z', offset: 1 } ] }),
        Cubie({ stickers: [ { color: 4, axis: 'x', offset: -1 } ] }),
        Cubie({ stickers: [ { color: 5, axis: 'y', offset: 1 } ] }),
    ];

    const edges = [
        Cubie({
            stickers: [
                { color: 1, axis: 'z', offset: -1 },
                { color: 0, axis: 'y', offset: -1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: 2, axis: 'x', offset: 1 },
                { color: 0, axis: 'y', offset: -1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: 3, axis: 'z', offset: 1 },
                { color: 0, axis: 'y', offset: -1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: 4, axis: 'x', offset: -1 },
                { color: 0, axis: 'y', offset: -1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: 2, axis: 'x', offset: 1 },
                { color: 1, axis: 'z', offset: -1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: 2, axis: 'x', offset: 1 },
                { color: 3, axis: 'z', offset: 1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: 4, axis: 'x', offset: -1 },
                { color: 3, axis: 'z', offset: 1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: 4, axis: 'x', offset: -1 },
                { color: 1, axis: 'z', offset: -1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: 1, axis: 'z', offset: -1 },
                { color: 5, axis: 'y', offset: 1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: 2, axis: 'x', offset: 1 },
                { color: 5, axis: 'y', offset: 1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: 3, axis: 'z', offset: 1 },
                { color: 5, axis: 'y', offset: 1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: 4, axis: 'x', offset: -1 },
                { color: 5, axis: 'y', offset: 1 },
            ],
        }),
    ];


    const corners = [
        Cubie({
            stickers: [
                { color: 2, axis: 'x', offset: 1 },
                { color: 0, axis: 'y', offset: -1 },
                { color: 1, axis: 'z', offset: -1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: 2, axis: 'x', offset: 1 },
                { color: 0, axis: 'y', offset: -1 },
                { color: 3, axis: 'z', offset: 1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: 4, axis: 'x', offset: -1 },
                { color: 0, axis: 'y', offset: -1 },
                { color: 3, axis: 'z', offset: 1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: 4, axis: 'x', offset: -1 },
                { color: 0, axis: 'y', offset: -1 },
                { color: 1, axis: 'z', offset: -1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: 2, axis: 'x', offset: 1 },
                { color: 5, axis: 'y', offset: 1 },
                { color: 1, axis: 'z', offset: -1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: 2, axis: 'x', offset: 1 },
                { color: 5, axis: 'y', offset: 1 },
                { color: 3, axis: 'z', offset: 1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: 4, axis: 'x', offset: -1 },
                { color: 5, axis: 'y', offset: 1 },
                { color: 3, axis: 'z', offset: 1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: 4, axis: 'x', offset: -1 },
                { color: 5, axis: 'y', offset: 1 },
                { color: 1, axis: 'z', offset: -1 },
            ],
        }),
    ];


    const cube = {
        edges: edges.map(edge => edge.stickers.map(sticker => sticker.color)),
        corners: corners.map(corner => corner.stickers.map(sticker => sticker.color)),
        centres: centres.map(centre => centre.stickers.map(sticker => sticker.color)),
        cubies: {
            edges,
            corners,
            centres,
        },
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
        // moves_instant
        // combine axial
        move: (move) => {
            // if (queue.length === 0 && lastMove) {
            //     lastMove.tween(0);
            // }
            queue.push(getMove(move, cube))
        },
        moves: (moves) => queue.push(...getMoves(moves, cube)),
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
                    //     move.tween(require('zdog').lerp(0, -0.01, Math.random()));
                    // }
                    lastMove = queue.shift();
                } else {
                    move.tween(elapsed / diff);
                }
            }
        },
    };
}
