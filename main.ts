import { CONSTANTS } from './utils/constants';

pixso.showUI(__html__, {
    width: 400,
    height: 500,
    title: 'SDDS tokens transfer',
});

pixso.ui.onmessage = async (msg) => {
    switch (msg.type) {
        // case CONSTANTS.msgType.importStyles:
        //     importStyles(msg.data);
        //     break;

        case CONSTANTS.msgType.getLocalStylesForExport: {
            const allStyles = pixso.getLocalPaintStyles();
            const statuses = await Promise.all(allStyles.map((style) => style.getPublishStatusAsync()));

            const localStyles = allStyles.filter((_, i) => statuses[i] === 'CURRENT');
            const exportData = localStyles.map((style) => {
                if (!style.paints || style.paints[0].type === 'IMAGE') return;

                if (style.paints[0].type === 'SOLID') {
                    return {
                        name: style.name,
                        type: style.paints[0].type,
                        opacity: style.paints[0].opacity,
                        color: style.paints[0]?.color,
                    };
                }

                return {
                    name: style.name,
                    type: style.paints[0].type,
                    opacity: style.paints[0].opacity,
                    gradientTransform: style.paints[0]?.gradientTransform,
                    gradientStops: style.paints[0]?.gradientStops,
                };
            });
            pixso.ui.postMessage({
                type: CONSTANTS.msgType.localStylesForExport,
                data: exportData,
            });
            break;
        }

        case CONSTANTS.msgType.closePlugin:
            pixso.closePlugin();
            break;
    }
};
