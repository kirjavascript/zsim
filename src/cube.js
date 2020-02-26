import Zdog, { lerp } from 'zdog';
import { getMoves, getMove, quarter } from './moves';

// TODO: destroy -> return translate / etc

export default function({ illo, zoom, colors, cubeColor }) {
    const distance = zoom * 42;

    function Cubie({ stickers }) {
        const anchor = new Zdog.Anchor({
            addTo: illo,
        });

        // infer position from cube stickers, because why not
        const translate = stickers.reduce((acc, { offset, axis }) => {
            acc[axis] = distance * offset;
            return acc;
        }, {});

        const size = zoom * 40;
        new Zdog.Box({
            addTo: anchor,
            width: size,
            height: size,
            depth: size,
            stroke: false,
            translate,
            color: cubeColor,
        });

        const stickerOffset = (size / 2) + 1;
        const rotations = {
            x: { y: quarter },
            y: { x: quarter },
        };

        stickers.forEach(({ color, axis, offset }) => {
            const sticker = new Zdog.Rect({
                addTo: anchor,
                width: size * 0.9,
                height: size * 0.9,
                stroke: 2,
                fill: true,
                translate,
                color: colors[color],
                rotate: rotations[axis],
            });

            sticker.translate[axis] += stickerOffset * offset;
        });

        return {
            anchor,
            stickers,
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

    const queue = [];

    // addState

    return {
        test_domove: () => {
            const moves = getMoves(`RU`, { corners, centres, edges });

            moves.forEach(d => d.apply())


            // do sune, support instant and different tps
        },
        render: () => {
        // [5, 9, 4, 1].map(i => cube.edges[i]).forEach(({ anchor }) => {
        //     anchor.rotate.x += 0.05;
        // });

        // [5, 4, 0, 1].map(i => cube.corners[i]).forEach(({ anchor }) => {
        //     anchor.rotate.x += 0.05;
        // })

        // cube.centres[2].anchor.rotate.x += 0.05;

        // if (anc.rotate.z < TAU / 4) {
        //     anc.rotate.z += 0.05;
        // } else {
        //     if (anc.rotate.y < TAU / 4) {
        //         anc.rotate.y += 0.05;
        //     }
        // }

        },
    };
}
