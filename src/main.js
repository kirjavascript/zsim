import Zdog, { TAU, lerp } from 'zdog';
import { hexToRgba } from './util';

/*
 * examples
 *
 * stickerless
 * japanese
 * alg demo
 * solve playback
 * timer
 * solver
 * trainer
 * controlled position
 */




function zsim(container) {
    const zoom = 2;
    const alpha = 1;
    const colors = [
        '#ffffff',
        '#0045ad',
        '#b90000',
        '#009b48',
        '#ff5900',
        '#ffd500',
    ].map(color => hexToRgba(color, alpha));
    const cubeColor = hexToRgba('#000', alpha); // rgb

    const element = container.appendChild(document.createElement('canvas'));
    element.setAttribute('width', zoom * 400);
    element.setAttribute('height', zoom * 400);

    const illo = new Zdog.Illustration({
        element,
        zoom,
        dragRotate: true,
    });

    new Zdog.Rect({
        addTo: illo,
        width: 80,
        height: 80,
        stroke: 20,
        fill: !0,
        color: '#F004',
    });


    function Cubie({
        translate,
        stickers,
    }) {
        const anchor = new Zdog.Anchor({
            addTo: illo,
        });
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


    const distance = zoom * 42;
    [
        Cubie({
            translate: {
                x: -distance,
                y: -distance,
                z: distance,
            },
            stickers: [
                { color: colors[4], axis: 'x', offset: -1 },
                { color: colors[0], axis: 'y', offset: -1 },
                { color: colors[3], axis: 'z', offset: 1 },
            ],
        }),
        Cubie({
            translate: {
                z: distance,
                y: -distance,
                x: distance,
            },
            stickers: [
                { color: colors[2], axis: 'x', offset: 1 },
                { color: colors[0], axis: 'y', offset: -1 },
                { color: colors[3], axis: 'z', offset: 1 },
            ],
        }),
        Cubie({
            translate: {
                z: distance,
                y: -distance,
                // x: distance,
            },
            stickers: [
                { color: colors[0], axis: 'y', offset: -1 },
                { color: colors[3], axis: 'z', offset: 1 },
            ],
        }),
        Cubie({
            translate: {
                z: distance,
                y: -distance,
            },
            stickers: [
                { color: colors[0], axis: 'y', offset: -1 },
                { color: colors[3], axis: 'z', offset: 1 },
            ],
        }),
        Cubie({
            translate: {
                z: distance,
            },
            stickers: [
                { color: colors[3], axis: 'z', offset: 1 },
            ],
        }),
    ];

    // const { anchor: anc } = ref;

    (function loop() {

        // if (anc.rotate.z < TAU / 4) {
        //     anc.rotate.z += 0.05;
        // } else {
        //     if (anc.rotate.y < TAU / 4) {
        //         anc.rotate.y += 0.05;
        //     }
        // }

        illo.updateRenderGraph();
        requestAnimationFrame(loop);
    })()
}

export default zsim;
