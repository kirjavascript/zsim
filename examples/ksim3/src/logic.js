import cube from './cube';
import { setTimerTime, setTimerText } from './timer';
import scrambler from '../lib/scrambler';

let state = 'idle'; // idle|ready|running
let timer;
let startTime;

function startTimer() {
    startTime = performance.now();
    state = 'running';
    timer = () => {
        if (timer) {
            requestAnimationFrame(timer);
            setTimerTime(performance.now() - startTime);
        }
    };
    timer();
}

function stopTimer() {
    state = 'idle';
    timer = undefined;
}

export function escape() {
    stopTimer();
    cube.reset();
    setTimerText('');
}

export function space() {
    if (state === 'idle') {
        cube.setupMoves(scrambler.getRandomScramble());
        state = 'ready';
        setTimerText('');
    } else if (state === 'running') {
        if (cube.isSolved()) {
            stopTimer();
        }
    }
}

export function move(move) {
    const isRotation = /^[xyz]/.test(move);
    if (state === 'ready' && !isRotation) {
        startTimer();
    }
    cube.move(move);
}
