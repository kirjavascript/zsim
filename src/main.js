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
 * LL case
 * move slider (slide during moves) | lerp | snap
 * return to position lerp / delay
 * timer
 * -2 order
 * bld
 * solver
 * trainer
 * controlled position
 * disco / trippy
 * pillowed
 * R3 M'R2 axial
 * R2'
 */

function zsim(container, config = {}) {
    const cube = Cube({
        element: container.appendChild(document.createElement('canvas')),
        config,
    });

    (function loop() {
        cube.render();
        requestAnimationFrame(loop);
    })();

    return cube;
}

export default zsim;
