import React from 'react';
import './index.css';
import { Button, BodyS } from '@salutejs/sdds-serv';
import type { DesignSystem, FlowType } from 'types';
import { DESIGN_SYSTEMS } from '../../data/designSystems';

interface SelectScreenProps {
    flow: FlowType;
    onSelect: (system: DesignSystem) => void;
}

export const SelectScreen: React.FC<SelectScreenProps> = ({ flow, onSelect }) => {
    const title = flow === 'import' ? 'Выберите дизайн-систему для импорта' : 'Выберите дизайн-систему для экспорта';

    return (
        <div className="select-screen">
            <BodyS className="select-screen__title">{title}</BodyS>
            <div className="select-screen__list">
                {DESIGN_SYSTEMS.map((system) => (
                    <Button
                        size="s"
                        key={system.id}
                        stretching="filled"
                        view="secondary"
                        onClick={() => onSelect(system)}
                    >
                        {system.name}
                    </Button>
                ))}
            </div>
        </div>
    );
};
