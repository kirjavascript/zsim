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
 * record/playback
 * alg demo
 * ksim flexlayout-react
 * solve playback
 * move slider (slide during moves) | lerp | snap
 * return to position lerp / delay
 * timer
 * -2 order
 * bld
 * solver
 * trainer
 * controlled position
 * disco
 * pillowed
 * R3 M'R2 axial
 * R2'
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
    const cubeColor = hexToRgba('#814ED0', alpha); // rgb

    const element = container.appendChild(document.createElement('canvas'));
    element.setAttribute('width', zoom * 400);
    element.setAttribute('height', zoom * 400);

    const illo = new Zdog.Illustration({
        element,
        zoom,
        dragRotate: true,
    });

    illo.rotate.y += 0.3;
    illo.rotate.x -= 0.3;

    const cube = Cube({ illo, zoom, colors, cubeColor });

    (function loop() {
        cube.render();
        illo.updateRenderGraph();
        requestAnimationFrame(loop);
    })();

    return cube;
}

export default zsim;
