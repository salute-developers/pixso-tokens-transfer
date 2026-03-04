import type { TokenNameMap, ThemeValue } from '../types';
import { CONSTANTS } from './constants';

const smileToThemeMap = {
    '🌕': 'light',
    '🌑': 'dark',
};

export const loadLocalStyles = async () => {
    try {
        const localStyles = pixso.getLocalPaintStyles();
        console.log(localStyles);

        // const parsedTokens = localStyles.reduce((acc: TokenNameMap, curr: PaintStyle) => {
        //     const rawTokenName = curr.name;
        //     const moonEmoji = [...rawTokenName][0] || '';
        //     const themeValue = smileToThemeMap[moonEmoji as keyof typeof smileToThemeMap] as ThemeValue;
        //     const tokenName = rawTokenName.replace(/🌕|🌑/g, '');

        //     if (!themeValue) {
        //         return acc;
        //     }

        //     if (!acc[tokenName]) {
        //         acc[tokenName] = {
        //             light: {
        //                 id: '',
        //                 key: '',
        //             },
        //             dark: {
        //                 id: '',
        //                 key: '',
        //             },
        //         };
        //     }

        //     acc[tokenName][themeValue] = {
        //         id: String(curr.id),
        //         key: String(curr.key),
        //     };

        //     return acc;
        // }, {} as TokenNameMap);

        // const lightToDarkMapKeys = Object.values(parsedTokens).reduce((acc: Record<string, string>, curr) => {
        //     const key = curr.light.key;
        //     const value = curr.dark.key;

        //     acc[key] = value;

        //     return acc;
        // }, {});

        // const lightToDarkMapIds = Object.values(parsedTokens).reduce((acc: Record<string, string>, curr) => {
        //     const key = curr.light.id;
        //     const value = curr.dark.id;

        //     acc[key] = value;

        //     return acc;
        // }, {});

        pixso.ui.postMessage({
            type: CONSTANTS.msgType.loadLocalStyles,
            data: { loadLocalStylesCount: localStyles.length },
        });

        pixso.notify(`Найдено ${localStyles.length} локальных стилей`, { icon: 'SUCCESS' });
    } catch (error) {
        console.error('Error finding local paint styles:', error);
        pixso.notify('Ошибка поиска локальных стилей', { error: true });
    }
};
