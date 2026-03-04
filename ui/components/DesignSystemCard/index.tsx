import React from 'react';
import './index.css';
import type { DesignSystem, FlowType } from 'types';
import { H4 } from '@salutejs/sdds-serv';
import pixsoLogo from '../../assets/pixso.png';
import dsBuilderLogo from '../../assets/ds-builder.png';
import pixsoForCard from '../../assets/pixso-for-card.svg';
import dsBuilderForCard from '../../assets/ds-builder-for-card.svg';

interface DesignSystemCardProps {
    system: DesignSystem;
    flow: FlowType;
}

export const DesignSystemCard: React.FC<DesignSystemCardProps> = ({ system, flow }) => {
    const thumb = flow === 'import' ? pixsoForCard : dsBuilderForCard;
    const logo = flow === 'import' ? pixsoLogo : dsBuilderLogo;
    const logoAlt = flow === 'import' ? 'Pixso' : 'DS Builder';

    return (
        <div className="ds-card">
            <img src={logo} alt={logoAlt} className="ds-card__logo" />
            <img src={thumb} alt={logoAlt} className="ds-card__thumb" />
            <H4 className="ds-card__name">{system.name}</H4>
        </div>
    );
};
