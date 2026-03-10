import React from 'react';
import './index.css';
import { Button, BodyS } from '@salutejs/sdds-serv';
import type { FlowType } from 'types';
import { FlowIllustration } from '../../components';

interface HomeScreenProps {
    flow: FlowType;
    onStart: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ flow, onStart }) => {
    const isImport = flow === 'import';

    const description = isImport ? (
        <>
            Текущие стили в <span className="accent-info-in-text">Pixso</span> будут заменены значениями из{' '}
            <span className="accent-info-in-text">DS Builder</span>. Все связанные компоненты обновятся автоматически.
        </>
    ) : (
        <>
            Опубликованные локальные стили из <span className="accent-info-in-text">Pixso</span> будут собраны в файл
            для загрузки в <span className="accent-info-in-text">DS Builder</span>. Скачиваение файла начнется
            автоматически.
        </>
    );

    return (
        <div className="home-screen">
            <FlowIllustration flow={flow} />
            <BodyS className="home-screen__description">{description}</BodyS>
            <Button size="s" stretching="filled" onClick={onStart}>
                {isImport ? 'Импортировать' : 'Экспортировать'}
            </Button>
        </div>
    );
};
