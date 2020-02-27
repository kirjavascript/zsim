export function hexToRgba(x,a=1) {
    return `rgba(${x.match(x[5]?/\w./g:/\w/g).map(d=>`0x`+d+d&255)},${a})`;
}
