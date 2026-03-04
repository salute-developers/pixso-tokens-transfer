import { CONSTANTS } from './utils/constants';
import { loadLocalStyles, importStyles } from './utils';

pixso.showUI(__html__, {
    width: 400,
    height: 500,
    title: 'SDDS tokens transfer',
});

pixso.ui.onmessage = async (msg) => {
    switch (msg.type) {
        case CONSTANTS.msgType.loadLocalStyles:
            await loadLocalStyles();
            break;

        case CONSTANTS.msgType.importStyles:
            importStyles(msg.data);
            break;

        case CONSTANTS.msgType.getActiveTheme: {
            const activeTheme = await pixso.clientStorage.getAsync(CONSTANTS.storageActiveTheme);
            pixso.ui.postMessage({
                type: CONSTANTS.msgType.activeThemeFetched,
                data: { activeTheme: activeTheme || null },
            });
            break;
        }

        case CONSTANTS.msgType.changeActiveTheme: {
            await pixso.clientStorage.setAsync(CONSTANTS.storageActiveTheme, msg.data.theme);
            pixso.ui.postMessage({
                type: CONSTANTS.msgType.activeThemeChanged,
                data: { activeTheme: msg.data.theme },
            });
            break;
        }

        case CONSTANTS.msgType.getLocalStylesForExport: {
            const localStyles = pixso.getLocalPaintStyles();
            const exportData = localStyles.map((style) => ({
                id: style.id,
                key: style.key,
                type: style.type,
                name: style.name,
                paints: style.paints,
            }));
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
