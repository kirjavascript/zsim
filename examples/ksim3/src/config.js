import cube from './cube';

const gui = new dat.GUI();
if (window.innerWidth < 800) {
    gui.close();
}
gui.add(cube, 'tps');
