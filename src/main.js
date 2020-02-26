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
 * move slider
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

    (function loop() {
        cube.render();
        illo.updateRenderGraph();
        requestAnimationFrame(loop);
    })();

    return cube;
}

export default zsim;
