import type { DesignSystem } from 'types';

const data = [
    {
        id: 1,
        name: 'sdds_cs',
        projectName: 'SDSD CS',
    },
    {
        id: 2,
        name: 'sdds_finai',
        projectName: 'SDSD FINAI',
    },
    {
        id: 3,
        name: 'sdds_serv',
        projectName: 'SDSD SERV',
    },
];

export const getDesignSystems = async (): Promise<DesignSystem[]> => {
    // const res = await fetch('https://plasma.sberdevices.ru/data/tenants.json', {
    //     method: 'GET',
    //     credentials: 'include',
    //     headers: {
    //         'Content-Type': ' application/json',
    //     },
    // });

    // const data = await res.json();
    // console.log(res);

    return data.map((item: { id: number; name: string; projectName: string }) => ({
        id: String(item.id),
        name: item.name,
        projectName: item.projectName,
    }));
};
