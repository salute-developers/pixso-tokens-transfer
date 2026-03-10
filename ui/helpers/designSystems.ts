import type { DesignSystem } from 'types';

export const getDesignSystems = async (): Promise<DesignSystem[]> => {
    const res = await fetch('https://client-proxy.design-system-builder.ru/api/design-systems', {
        method: 'GET',
        headers: {
            Authorization: `Bearer `,
        },
    });

    const data = await res.json();

    return data.map((item: { id: number; name: string; projectName: string }) => ({
        id: String(item.id),
        name: item.name,
        projectName: item.projectName,
    }));
};
