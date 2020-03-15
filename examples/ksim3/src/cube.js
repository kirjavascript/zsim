const element = document.querySelector('body').appendChild(document.createElement('div'));

element.className = 'cube';

const cube = zsim.default(element, {
    size: 750,
    tps: 10,
    fov: 0.7,
    cubies: false,
    rotate: {
        x: -(Math.PI / 4),
        y: 0,
    },
});

window.cube = cube;

export default cube;
