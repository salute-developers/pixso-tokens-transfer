import { CONSTANTS } from './constants';
import { getGradientAngle, rgbToHex } from './colorConverter';
import { transformStyleName } from './styleNameTransformer';

export const exportStyles = async () => {
    const allStyles = pixso.getLocalPaintStyles();
    const statuses = await Promise.all(allStyles.map((style) => style.getPublishStatusAsync()));

    const localStyles = allStyles.filter((_, i) => statuses[i] === 'CURRENT');
    const exportData = allStyles.map((style) => {
        if (!style.paints || style.paints[0].type === 'IMAGE') return;

        if (style.paints[0].type === 'SOLID') {
            return {
                name: transformStyleName(style.name),
                initialName: style.name,
                enabled: style.paints[0].visible,
                paints: [
                    {
                        type: 'color',
                        opacity: style.paints[0].opacity?.toFixed(3),
                        color: rgbToHex(style.paints[0]?.color),
                    },
                ],
            };
        }

        const gradientPaints = style.paints.map((paint) => {
            const gradientPaint = paint as GradientPaint;

            return {
                type: 'gradient',
                kind: gradientPaint.type.replace('GRADIENT_', '').toLowerCase(),
                opacity: gradientPaint.opacity?.toFixed(3),
                gradientAngle: getGradientAngle(gradientPaint.gradientTransform),
                gradientStops: gradientPaint.gradientStops?.map((stopInfo) => ({
                    stop: stopInfo.position.toFixed(3),
                    color: rgbToHex(stopInfo.color),
                })),
                gradientTransform: gradientPaint.gradientTransform,
            };
        });

        return {
            name: transformStyleName(style.name),
            initialName: style.name,
            paints: gradientPaints,
            enabled: style.paints[0].visible,
        };
    });

    pixso.ui.postMessage({
        type: CONSTANTS.msgType.localStylesForExport,
        data: exportData,
    });
};
