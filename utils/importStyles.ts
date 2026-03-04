import type { RemoteStyleData } from '../types';
import { CONSTANTS } from './constants';

export const importStyles = (remoteStyles: RemoteStyleData[]) => {
    try {
        const localStyles = pixso.getLocalPaintStyles();

        const localStylesByName = new Map<string, PaintStyle>(localStyles.map((style) => [style.name, style]));

        let created = 0;
        let updated = 0;

        for (const remoteStyle of remoteStyles) {
            const { name, paints } = remoteStyle;

            // Normalize paints to array (API may return single object or array)
            const paintsArray = Array.isArray(paints) ? paints : [paints];

            const mappedPaints: Paint[] = paintsArray.map((paint) => ({
                type: paint.type as 'SOLID',
                blendMode: paint.blendMode as BlendMode,
                opacity: paint.opacity,
                visible: paint.visible,
                color: paint.color,
            }));

            const existingStyle = localStylesByName.get(name);

            if (existingStyle) {
                existingStyle.name = name;
                existingStyle.paints = mappedPaints;
                updated++;
            } else {
                const newStyle = pixso.createPaintStyle();
                newStyle.name = name;
                newStyle.paints = mappedPaints;
                created++;
            }
        }

        pixso.ui.postMessage({
            type: CONSTANTS.msgType.stylesImported,
            data: { created, updated },
        });

        pixso.notify(`Создано: ${created}, обновлено: ${updated} стилей`, { icon: 'SUCCESS' });
    } catch (error) {
        console.error('Error importing styles:', error);
        pixso.notify('Ошибка импорта стилей', { error: true });
    }
};
