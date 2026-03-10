import React from 'react';
import './index.css';
import { Button, Spinner, H4, BodyS } from '@salutejs/sdds-serv';
import type { FlowType, ResultState } from 'types';
import { LogViewer } from '../../components';
import operationSuccess from '../../assets/operation-success.png';
import operationError from '../../assets/operation-error.png';

interface ResultScreenProps {
    flow: FlowType;
    resultState: ResultState;
    logs: string[];
    onClose: () => void;
}

const resultStateInfo = (flow: FlowType) => ({
    success: {
        title: `Стили успешно ${flow === 'import' ? 'импортированы' : 'экспортированы'}`,
        subtitle: `Стили успешно ${
            flow === 'import' ? 'загружены в Pixso' : 'сформированы в файл для загрузки в DS Builder'
        }. Вы можете закрыть окно и проверить обновления.`,
        img: operationSuccess,
    },
    error: {
        title: `Не удалось выполнить ${flow === 'import' ? 'импорт' : 'экспорт'}`,
        subtitle: `Произошла ошибка при загрузке стилей. Проверьте журнал изменений операцию.`,
        img: operationError,
    },
});

export const ResultScreen: React.FC<ResultScreenProps> = ({ flow, resultState, logs, onClose }) => {
    if (resultState === 'loading') {
        return (
            <div className="result-screen result-screen--loading">
                <Spinner size={48} />
            </div>
        );
    }

    const { title, subtitle, img } = resultStateInfo(flow)[resultState];

    return (
        <div className="result-screen">
            <div className="result-screen__image-container">
                <img src={img} alt="Ошибка" className="result-screen__image" />
            </div>
            <H4 className="result-screen__title">{title}</H4>
            <BodyS className="result-screen__subtitle">{subtitle}</BodyS>
            <Button size="s" stretching="filled" onClick={onClose}>
                Закрыть
            </Button>
            {resultState === 'error' && <LogViewer logs={logs} />}
        </div>
    );
};
