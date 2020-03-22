import cube from './cube';
import { escape, space, move } from './logic';

const keys = [
    ['I', 'R2'],
    ['K', "R2"],
    ['F', "U2"],
    ['J', "U2"],
    ['g', "M'"],
    ['H', 'E2'],
    ['G', 'E2'],
    ['h', 'M'],


    ['i', 'R'],
    ['k', "R'"],
    ['8', 'R2'],
    ['u', 'r'],
    ['m', "r'"],
    ['j', 'U'],
    ['f', "U'"],
    ['s', 'D'],
    ['l', "D'"],
    ['n', 'F'],
    ['v', "F'"],
    ['o', "B'"],
    ['w', 'B'],
    ['d', 'L'],
    ['e', "L'"],
    ['3', 'L2'],
    ['c', 'l'],
    ['r', "l'"],
    [';', 'y'],
    ['a', "y'"],
    ['y', 'x'],
    ['t', "x'"],
    ['p', 'z'],
    ['q', "z'"],

    // ['n', `x'`],
    // ['g', "F'"],
    // ['h', 'F'],
    // ['k', `R'`],
].reduce((a, [b, c]) => ((a[b] = c), a), {});

window.addEventListener('keydown', e => {
    if (keys[e.key]) {
        move(keys[e.key])
    } else if (e.key === 'Escape') {
        escape();
    } else if (e.key === ' ') {
        space();
    }
});
