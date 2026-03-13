export type Screen = 'home' | 'select' | 'confirm' | 'result';
export type FlowType = 'import' | 'export';
export type ResultState = 'loading' | 'success' | 'error';

export type DesignSystem = {
    id: string;
    name: string;
    projectName: string;
};

export type PixsoRGB = {
    r: number;
    g: number;
    b: number;
};

export type RemotePaint = {
    type: string;
    blendMode: string;
    opacity: number;
    visible: boolean;
    color: PixsoRGB;
};

export type RemoteStyleData = {
    name: string;
    paints: RemotePaint | RemotePaint[];
};
