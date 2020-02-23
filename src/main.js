// dat.gui
import Zdog, { TAU, lerp } from 'zdog';

function zsim(container) {
    const zoom = 2;
    const colors = [];
    const cubeColor = '#000';
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
        color: '#F00',
    });
    new Zdog.Rect({
        addto: illo,
        width: 83,
        height: 83,
        stroke: 20,
        translate: { z: -4 },
        color: '#000',
    });


    const distance = zoom * 42;
    function Corner({ translate, rotate }) {
        const anc = new Zdog.Anchor({
            addTo: illo,
        });

        const size = zoom * 40;
        const box = new Zdog.Box({
            addTo: anc,
            width: size,
            height: size,
            depth: size,
            stroke: false,
            // color: '#C25', // default face color
            leftFace: '#EA0',
            rightFace: 'transparent',
            rearFace: 'transparent',
            frontFace: 'rgba(255, 0, 0, 0.5)',
            topFace: '#ED0',
            bottomFace: 'transparent',
            translate,
            rotate,
        });

        const stickerA = new Zdog.Rect({
            addTo: illo,
            width: size * 0.9,
            height: size * 0.9,
            stroke: 2,
            fill: true,
            translate,
            color: '#000',
        });

        stickerA.translate.z += (size / 2) + 1
        // stickers instead of rotation
    }

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
