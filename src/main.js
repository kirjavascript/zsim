// dat.gui
import Zdog from 'zdog';

// dont forget to math

class ZSim {
    constructor(container) {
        const zoom = 2;
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
            addTo: illo,
            width: 83,
            height: 83,
            stroke: 20,
            translate: { z: -4 },
            color: '#000',
        });

        const anc = new Zdog.Anchor({
            addTo: illo,
        });

        const size = zoom * 40;
        const distance = zoom * 42;
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
            frontFace: '#F00',
            topFace: '#ED0',
            bottomFace: 'transparent',
            translate: {
                z: distance,
                y: -distance,
                x: -distance,
            },
        });


        (function loop() {

            anc.rotate.z += 0.1;

            illo.updateRenderGraph();
            requestAnimationFrame(loop);
        })()
    }
}

const core = new ZSim(document.querySelector('main'));

console.log(core);

export { ZSim as core };
