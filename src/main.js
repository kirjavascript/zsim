// dat.gui
import Zdog from 'zdog';

// dont forget to math

class CoreSim {
    constructor(container) {
        const zoom = 2;
        const element = container.appendChild(document.createElement('canvas'));
        element.width = zoom * 200;
        element.height = zoom * 200;

        let illo = new Zdog.Illustration({
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
        let box = new Zdog.Box({
            addTo: illo,
            width: 120,
            height: 120,
            depth: 120,
            stroke: false,
            // color: '#C25', // default face color
            leftFace: '#EA0',
            rightFace: 'transparent',
            rearFace: 'transparent',
            frontFace: '#F00',
            topFace: '#ED0',
            bottomFace: 'transparent',
            translate: {
                z: 120,
                y: -120,
                x: -120,
            },
        });


        (function loop() {

            illo.updateRenderGraph();
            requestAnimationFrame(loop);
        })()
    }
}

const core = new CoreSim(document.querySelector('main'));

console.log(core);
