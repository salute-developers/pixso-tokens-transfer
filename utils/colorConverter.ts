import { PixsoRGB } from 'types/index';

export const getGradientAngle = (gradientTransform: number[][]): number => {
    const [[a, b, tx], [c, d, ty]] = gradientTransform;

    // Градиент в нормализованном пространстве идёт от (0, 0.5) до (1, 0.5)
    const startX = b * 0.5 + tx;
    const startY = d * 0.5 + ty;
    const endX = a * 1 + b * 0.5 + tx;
    const endY = c * 1 + d * 0.5 + ty;

    const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
    return (angle + 360) % 360;
};

export const rgbToHex = ({ r, g, b }: PixsoRGB): string => {
    return (
        '#' +
        [r, g, b]
            .map((v) =>
                Math.round(v * 255)
                    .toString(16)
                    .padStart(2, '0'),
            )
            .join('')
    );
};
