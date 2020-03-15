import Zdog, { lerp } from 'zdog';

const { move, line } = Zdog.CanvasRenderer;

export default function setFov(i) {
    if (i === 0) {
        Object.assign(Zdog.CanvasRenderer, { move, line });
    } else {
        const sign = i < 0 ? -1 : 1;
        const fov = sign * lerp(-20000, -250, Math.abs(Math.cos(sign - i)));

        Zdog.CanvasRenderer.move = (ctx, elem, point) => {
            const s = fov / (fov + point.z);
            ctx.moveTo(point.x * s, point.y * s);
        };

        Zdog.CanvasRenderer.line = (ctx, elem, point) => {
            const s = fov / (fov + point.z);
            ctx.lineTo(point.x * s, point.y * s);
        };
    }
}
