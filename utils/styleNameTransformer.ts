const EMOJI_THEME_MAP: Record<string, string> = {
    '🌕': 'light',
    '🌑': 'dark',
};

const extractEmoji = (str: string): { emoji: string; text: string } => {
    const match = str.match(/^\p{Emoji}/u);
    return match ? { emoji: match[0], text: str.slice(match[0].length).trim() } : { emoji: '', text: str.trim() };
};

const splitCamelCase = (str: string): string[] =>
    str
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .split(/\s+/);

export const transformStyleName = (name: string): string => {
    const segments = name.split('/');
    const firstSegment = segments[0];
    const lastSegment = segments[segments.length - 1];

    const { emoji, text: firstText } = extractEmoji(firstSegment);
    const theme = EMOJI_THEME_MAP[emoji];

    const splittedByCamelCase = splitCamelCase(lastSegment);
    const partsLength = splitCamelCase.length - 1;
    const tokenName = splittedByCamelCase
        .map((w, i) => {
            if (w.toLowerCase() === 'on') {
                return '';
            }

            if (w.toLowerCase() === 'dark' && i !== partsLength) {
                return 'on-dark';
            }

            if (w.toLowerCase() === 'light' && i !== partsLength) {
                return 'on-light';
            }

            return w.toLowerCase();
        })
        .filter(Boolean);

    if (tokenName.length < 3 || firstText.includes('Default')) {
        tokenName.unshift('default');
    }

    const category = tokenName[1] === 'background' ? tokenName[0].replace('on-', '') : tokenName[0];

    return [...(theme ? [theme] : []), tokenName[1], category, tokenName.slice(2).join('-')].join('.');
};
