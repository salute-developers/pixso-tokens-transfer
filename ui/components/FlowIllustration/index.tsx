import React from 'react';
import './index.css';
import type { FlowType } from 'types';
import dsBuilderSquared from '../../assets/ds-builder-squared.png';
import pixsoSquared from '../../assets/pixso-squared.png';
import { BodyS } from '@salutejs/sdds-serv';
import { IconArrowRight } from '@salutejs/plasma-icons';

interface FlowIllustrationProps {
    flow: FlowType;
}

export const FlowIllustration: React.FC<FlowIllustrationProps> = ({ flow }) => {
    const isImport = flow === 'import';
    const leftImg = isImport ? dsBuilderSquared : pixsoSquared;
    const rightImg = isImport ? pixsoSquared : dsBuilderSquared;
    const leftLabel = isImport ? 'DS Builder' : 'Pixso';
    const rightLabel = isImport ? 'Pixso' : 'DS Builder';

    return (
        <div className="flow-illustration">
            <div className="flow-illustration__item">
                <img src={leftImg} alt={leftLabel} className="flow-illustration__logo" />
                <BodyS>{leftLabel}</BodyS>
            </div>
            <IconArrowRight size="s" className="flow-illustration__arrow" />
            <div className="flow-illustration__item">
                <img src={rightImg} alt={rightLabel} className="flow-illustration__logo" />
                <BodyS>{rightLabel}</BodyS>
            </div>
        </div>
    );
};
