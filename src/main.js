import Zdog, { TAU, lerp } from 'zdog';
import { hexToRgba } from './util';

function zsim(container) {
    const zoom = 2;
    const alpha = 1;
    const colors = [
    ];
    const cubeColor = hexToRgba('#000', alpha); // rgb
    const element = container.appendChild(document.createElement('canvas'));
    element.setAttribute('width', zoom * 400);
    element.setAttribute('height', zoom * 400);

    const illo = new Zdog.Illustration({
        element,
        zoom,
        dragRotate: true,
    });

    // add circle
    new Zdog.Rect({
        addTo: illo,
        width: 80,
        height: 80,
        stroke: 20,
        fill: !0,
        color: '#F004',
    });


    function Corner({ translate, rotate, stickerless = false }) {
        const anchor = new Zdog.Anchor({
            addTo: illo,
        });


        const size = zoom * 40;
        const typeConfig = stickerless ? {
            leftFace: '#EA0',
            rightFace: 'transparent',
            rearFace: 'transparent',
            frontFace: 'rgba(255, 0, 0, 0.5)',
            topFace: '#ED0',
            bottomFace: 'transparent',
        } : {
            leftFace: cubeColor,
            rightFace: cubeColor,
            rearFace: cubeColor,
            frontFace: cubeColor,
            topFace: cubeColor,
            bottomFace: cubeColor,
        };
        const box = new Zdog.Box({
            addTo: anchor,
            width: size,
            height: size,
            depth: size,
            stroke: false,
            ...typeConfig,
            translate,
            rotate,
        });

        if (!stickerless) {
            const stickerOffset = (size / 2) + 1;

            const stickerA = new Zdog.Rect({
                addTo: illo,
                width: size * 0.9,
                height: size * 0.9,
                stroke: 2,
                fill: true,
                translate,
                color: '#F00',
            });

            const stickerB = stickerA.copy({
                color: '#0F0',
                rotate: { y: TAU / 4 },
            });

            const stickerC = stickerA.copy({
                color: '#00F',
                rotate: { x: TAU / 4 },
            });

            stickerA.translate.z += stickerOffset;
            stickerB.translate.x -= stickerOffset;
            stickerC.translate.y -= stickerOffset;
        }

        // stickers instead of rotation
        return {
            anchor,
        };
    }

    const distance = zoom * 42;
    Corner({
        translate: {
            z: distance,
            y: -distance,
            x: -distance,
        },
    });
    Corner({
        translate: {
            z: distance,
            y: -distance,
            x: distance,
        },
        rotate: {
            z: TAU / 4
        },
    });

    (function loop() {

        // if (anc.rotate.z < TAU / 4) {
        //     anc.rotate.z += 0.05;
        // } else {
        //     if (anc.rotate.x < TAU / 4) {
        //         anc.rotate.x += 0.05;
        //     } else {
        //         if (anc.rotate.y < TAU / 4) {
        //             anc.rotate.y += 0.05;
        //         } else {
        //         }
        //     }
        // }

        illo.updateRenderGraph();
        requestAnimationFrame(loop);
    })()
}

export default zsim;
