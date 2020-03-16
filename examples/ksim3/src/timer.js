const timerElement = document.querySelector('body')
    .appendChild(document.createElement('h1'))

export function setTimerTime(time) {
    setTimerText(timestamp(time))
}

export function setTimerText(text) {
    timerElement.textContent = text;
}





export function timestamp(time) {
    if (~[null,Infinity].indexOf(time)) {
        return 'DNF';
    }
    let seconds = (time/1000).toFixed(2);
    let minutes = (seconds/60)|0;
    if (minutes) {
        seconds = (seconds%60).toFixed(2);
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return `${minutes}:${seconds}`;
    }
    else {
        return seconds;
    }
}
