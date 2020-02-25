import Zdog, { TAU } from 'zdog';

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
            x: { y: TAU / 4 },
            y: { x: TAU / 4 },
        };

        stickers.forEach(({ color, axis, offset }) => {
            const sticker = new Zdog.Rect({
                addTo: anchor,
                width: size * 0.9,
                height: size * 0.9,
                stroke: 2,
                fill: true,
                translate,
                color,
                rotate: rotations[axis],
            });

            sticker.translate[axis] += stickerOffset * offset;
        });

        return {
            anchor,
        };
    }
    // addTo to addChild

    const centres = [
        Cubie({ stickers: [ { color: colors[0], axis: 'y', offset: -1 } ] }),
        Cubie({ stickers: [ { color: colors[1], axis: 'z', offset: -1 } ] }),
        Cubie({ stickers: [ { color: colors[2], axis: 'x', offset: 1 } ] }),
        Cubie({ stickers: [ { color: colors[3], axis: 'z', offset: 1 } ] }),
        Cubie({ stickers: [ { color: colors[4], axis: 'x', offset: -1 } ] }),
        Cubie({ stickers: [ { color: colors[5], axis: 'y', offset: 1 } ] }),
    ];

    const edges = [
        Cubie({
            stickers: [
                { color: colors[1], axis: 'z', offset: -1 },
                { color: colors[0], axis: 'y', offset: -1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: colors[2], axis: 'x', offset: 1 },
                { color: colors[0], axis: 'y', offset: -1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: colors[3], axis: 'z', offset: 1 },
                { color: colors[0], axis: 'y', offset: -1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: colors[4], axis: 'x', offset: -1 },
                { color: colors[0], axis: 'y', offset: -1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: colors[2], axis: 'x', offset: 1 },
                { color: colors[1], axis: 'z', offset: -1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: colors[2], axis: 'x', offset: 1 },
                { color: colors[3], axis: 'z', offset: 1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: colors[4], axis: 'x', offset: -1 },
                { color: colors[3], axis: 'z', offset: 1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: colors[4], axis: 'x', offset: -1 },
                { color: colors[1], axis: 'z', offset: -1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: colors[1], axis: 'z', offset: -1 },
                { color: colors[5], axis: 'y', offset: 1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: colors[2], axis: 'x', offset: 1 },
                { color: colors[5], axis: 'y', offset: 1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: colors[3], axis: 'z', offset: 1 },
                { color: colors[5], axis: 'y', offset: 1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: colors[4], axis: 'x', offset: -1 },
                { color: colors[5], axis: 'y', offset: 1 },
            ],
        }),
    ];


    const corners = [
        Cubie({
            stickers: [
                { color: colors[2], axis: 'x', offset: 1 },
                { color: colors[0], axis: 'y', offset: -1 },
                { color: colors[1], axis: 'z', offset: -1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: colors[2], axis: 'x', offset: 1 },
                { color: colors[0], axis: 'y', offset: -1 },
                { color: colors[3], axis: 'z', offset: 1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: colors[4], axis: 'x', offset: -1 },
                { color: colors[0], axis: 'y', offset: -1 },
                { color: colors[3], axis: 'z', offset: 1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: colors[4], axis: 'x', offset: -1 },
                { color: colors[0], axis: 'y', offset: -1 },
                { color: colors[1], axis: 'z', offset: -1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: colors[2], axis: 'x', offset: 1 },
                { color: colors[5], axis: 'y', offset: 1 },
                { color: colors[1], axis: 'z', offset: -1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: colors[2], axis: 'x', offset: 1 },
                { color: colors[5], axis: 'y', offset: 1 },
                { color: colors[3], axis: 'z', offset: 1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: colors[4], axis: 'x', offset: -1 },
                { color: colors[5], axis: 'y', offset: 1 },
                { color: colors[3], axis: 'z', offset: 1 },
            ],
        }),
        Cubie({
            stickers: [
                { color: colors[4], axis: 'x', offset: -1 },
                { color: colors[5], axis: 'y', offset: 1 },
                { color: colors[1], axis: 'z', offset: -1 },
            ],
        }),
    ];

    return {
        corners,
        centres,
        edges,
    };
}
