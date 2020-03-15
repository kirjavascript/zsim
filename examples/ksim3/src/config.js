import cube from './cube';

const gui = new dat.GUI();
if (window.innerWidth < 800) {
    gui.close();
}
gui.add(cube, 'tps');
gui.add(cube, 'size', 10, 1000);
gui.add(cube, 'backface');
