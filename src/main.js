import Zdog from 'zdog';
import { hexToRgba } from './util';
import Cube from './cube';

/*
 * examples
 *
 * stickerless
 * backface
 * japanese
 * snap to position
 * alg demo
 * solve playback
 * timer
 * solver
 * trainer
 * controlled position
 * disco
 * pillowed
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

    const cube = Cube({ illo, zoom, colors, cubeColor });
    console.log(cube);
    // move queue

    // const { anchor: anc } = ref;

    (function loop() {
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

        illo.updateRenderGraph();
        requestAnimationFrame(loop);
    })()
}

export default zsim;
