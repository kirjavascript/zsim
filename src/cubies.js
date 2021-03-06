import Zdog from 'zdog';
import { quarter } from './moves';

// TODO: axis and offset can be inferred from color

const centres = [
    // U B R F L D
    { color: 0, axis: 'y', offset: -1 },
    { color: 1, axis: 'z', offset: -1 },
    { color: 2, axis: 'x', offset: 1 },
    { color: 3, axis: 'z', offset: 1 },
    { color: 4, axis: 'x', offset: -1 },
    { color: 5, axis: 'y', offset: 1 },
];

const edges = [
    // UB UR UF UL
    [ { color: 1, axis: 'z', offset: -1 }, { color: 0, axis: 'y', offset: -1 } ],
    [ { color: 2, axis: 'x', offset: 1 }, { color: 0, axis: 'y', offset: -1 } ],
    [ { color: 3, axis: 'z', offset: 1 }, { color: 0, axis: 'y', offset: -1 } ],
    [ { color: 4, axis: 'x', offset: -1 }, { color: 0, axis: 'y', offset: -1 } ],
    // BR FR FL BL
    [ { color: 2, axis: 'x', offset: 1 }, { color: 1, axis: 'z', offset: -1 } ],
    [ { color: 2, axis: 'x', offset: 1 }, { color: 3, axis: 'z', offset: 1 } ],
    [ { color: 4, axis: 'x', offset: -1 }, { color: 3, axis: 'z', offset: 1 } ],
    [ { color: 4, axis: 'x', offset: -1 }, { color: 1, axis: 'z', offset: -1 } ],
    // DB DR DF DL
    [ { color: 1, axis: 'z', offset: -1 }, { color: 5, axis: 'y', offset: 1 } ],
    [ { color: 2, axis: 'x', offset: 1 }, { color: 5, axis: 'y', offset: 1 } ],
    [ { color: 3, axis: 'z', offset: 1 }, { color: 5, axis: 'y', offset: 1 } ],
    [ { color: 4, axis: 'x', offset: -1 }, { color: 5, axis: 'y', offset: 1 } ],
];

const corners = [
    // UBR URF UFL ULB
    [
        { color: 2, axis: 'x', offset: 1 },
        { color: 0, axis: 'y', offset: -1 },
        { color: 1, axis: 'z', offset: -1 },
    ],
    [
        { color: 2, axis: 'x', offset: 1 },
        { color: 0, axis: 'y', offset: -1 },
        { color: 3, axis: 'z', offset: 1 },
    ],
    [
        { color: 4, axis: 'x', offset: -1 },
        { color: 0, axis: 'y', offset: -1 },
        { color: 3, axis: 'z', offset: 1 },
    ],
    [
        { color: 4, axis: 'x', offset: -1 },
        { color: 0, axis: 'y', offset: -1 },
        { color: 1, axis: 'z', offset: -1 },
    ],
    // DRB DFR DLF DBL
    [
        { color: 2, axis: 'x', offset: 1 },
        { color: 5, axis: 'y', offset: 1 },
        { color: 1, axis: 'z', offset: -1 },
    ],
    [
        { color: 2, axis: 'x', offset: 1 },
        { color: 5, axis: 'y', offset: 1 },
        { color: 3, axis: 'z', offset: 1 },
    ],
    [
        { color: 4, axis: 'x', offset: -1 },
        { color: 5, axis: 'y', offset: 1 },
        { color: 3, axis: 'z', offset: 1 },
    ],
    [
        { color: 4, axis: 'x', offset: -1 },
        { color: 5, axis: 'y', offset: 1 },
        { color: 1, axis: 'z', offset: -1 },
    ],
];

export function Model() {
    return {
        edges: edges.map(edge => edge.map(sticker => sticker.color)),
        corners: corners.map(corner => corner.map(sticker => sticker.color)),
        centres: centres.map(centre => [centre.color]),
    };
}

export function Cubies(obj) {
    return {
        edges: edges.map(edge => Cubie(cloneStickers(edge), obj)),
        corners: corners.map(corner => Cubie(cloneStickers(corner), obj)),
        centres: centres.map(centre => Cubie(cloneStickers([centre]), obj)),
    };
}

function cloneStickers(stickers) {
    return stickers.map(sticker => Object.assign({}, sticker));
}

function Cubie(stickers, { illo, config }) {
    const { colors: colorsRGB, baseZoom } = config;
    const distance = baseZoom * 76;

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

    const size = baseZoom * 72;
    if (config.cubies) {
        new Zdog.Box({
            addTo: container,
            width: size,
            height: size,
            depth: size,
            stroke: false,
            color: config.cubeColor,
        });
    }

    const stickerOffset = (size / 2) + 1;
    const rotations = {
        x: { y: quarter },
        y: { x: quarter },
    };

    const stickerElements = stickers.map(({ color, axis, offset }) => {
        const group = new Zdog.Group({
            addTo: container,
        });
        const stickerEl = new Zdog.Rect({
            addTo: group,
            width: size * 0.9,
            height: size * 0.9,
            stroke: 2,
            fill: true,
            color: colorsRGB[color],
            rotate: rotations[axis],
        });

        stickerEl.translate[axis] += stickerOffset * offset;

        if (config.backface) {
            const back = stickerEl.copy();
            back.translate[axis] += size * offset;
            const zOffset = axis === 'z' ? -1 : 1;
            back.front = { z: quarter * offset * zOffset };
            back.opacity = 0.5;
            back.alpha = 0.5;
            back.backface = false;
        }

        return group;
    });

    return {
        anchor,
        stickers,
        setColors: (colors) => {
            for (let i = 0; i < stickerElements.length; i++) {
                const color = colorsRGB[colors[i]];
                stickerElements[i].children[0].color = color;
                if (config.backface) {
                    stickerElements[i].children[1].color = color;
                }
                stickers[i].color = colors[i];
            }
        },
        destroy: () => anchor.remove(),
    };
}
