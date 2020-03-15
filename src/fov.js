import Zdog, { lerp } from 'zdog';

export default function setFov(i) {
    const sign = (i > 0) - (i < 0);
    const I = i < 0 ? -1 - i : 1 - i;
    const fov = sign * lerp(-20000, -250, Math.abs(Math.cos(I)));

    const scale = (z) => {
        if (i === 0) return 1;
        return fov / (fov + z);
    };

    Zdog.CanvasRenderer.move = (ctx, elem, point) => {
        const s = scale(point.z);
        ctx.moveTo(point.x * s, point.y * s);
    };

    Zdog.CanvasRenderer.line = (ctx, elem, point) => {
        const s = scale(point.z);
        ctx.lineTo(point.x * s, point.y * s);
    };
}
