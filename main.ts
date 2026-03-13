import { CONSTANTS } from './utils/constants';
import { exportStyles } from './utils';
import { getDesignSystems } from './ui/helpers/designSystems';

pixso.showUI(__html__, {
    width: 400,
    height: 500,
    title: 'SDDS tokens transfer',
});

pixso.ui.onmessage = async (msg) => {
    switch (msg.type) {
        case 'test_req':
            const data = await getDesignSystems();
            console.log(data);
            return;
        // case CONSTANTS.msgType.importStyles:
        //     importStyles(msg.data);
        //     break;

        case CONSTANTS.msgType.getLocalStylesForExport:
            await exportStyles();
            break;

        case CONSTANTS.msgType.closePlugin:
            pixso.closePlugin();
            break;
    }
};
