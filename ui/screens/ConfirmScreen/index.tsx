import React from 'react';
import './index.css';
import { Button, BodyS } from '@salutejs/sdds-serv';
import type { DesignSystem, FlowType } from 'types';
import { DesignSystemCard } from '../../components';

interface ConfirmScreenProps {
    flow: FlowType;
    system: DesignSystem;
    onBack: () => void;
    onConfirm: () => void;
}

export const ConfirmScreen: React.FC<ConfirmScreenProps> = ({ flow, system, onBack, onConfirm }) => {
    const buttonLabel = flow === 'import' ? 'Начать импорт в Pixso' : 'Начать экспорт в DS Builder';

    return (
        <div className="confirm-screen">
            <Button size="s" view="clear" onClick={onBack}>
                ← Назад
            </Button>
            <BodyS className="confirm-screen__label">Выбранная дизайн система</BodyS>
            <DesignSystemCard system={system} flow={flow} />
            <BodyS className="confirm-screen__description">
                Операция может занять некоторое время. Не выходите из Pixso до окончания процесса.
            </BodyS>
            <Button size="s" stretching="filled" onClick={onConfirm}>
                {buttonLabel}
            </Button>
        </div>
    );
};
