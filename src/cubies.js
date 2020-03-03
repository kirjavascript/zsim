import Zdog from 'zdog';
import { quarter } from './moves';

const centres = [
    // U B R F L D ?
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

    const { zoom, cubeColor, colorsRGB } = config;
    const distance = zoom * 38;

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

        const back = stickerEl.copy();
        back.translate[axis] += size * offset;
        const zOffset = axis === 'z' ? -1 : 1;
        back.front = { z: quarter * offset * zOffset };
        back.backface = false;

        return group;
    });

    return {
        anchor,
        stickers,
        setColors: (colors) => {
            for (let i = 0; i < stickerElements.length; i++) {
                const color = colors[i];
                stickerElements[i].children.forEach(child => {
                    child.color = colorsRGB[color];
                });
                stickers[i].color = color;
            }
        },
        destroy: () => anchor.remove(),
    };
}
