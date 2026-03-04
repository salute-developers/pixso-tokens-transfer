import React, { useRef, useCallback } from 'react';
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

const MAX_TILT = 15;

export const DesignSystemCard: React.FC<DesignSystemCardProps> = ({ system, flow }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const thumb = flow === 'import' ? pixsoForCard : dsBuilderForCard;
    const logo = flow === 'import' ? pixsoLogo : dsBuilderLogo;
    const logoAlt = flow === 'import' ? 'Pixso' : 'DS Builder';

    const handleMouseEnter = useCallback(() => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transition = '';
        card.style.setProperty('--glow-opacity', '1');
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const wrapper = wrapperRef.current;
        const card = cardRef.current;
        if (!wrapper || !card) return;

        const { left, top, width, height } = wrapper.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        const transform = `perspective(600px) rotateY(${x * MAX_TILT * 2}deg) rotateX(${-y * MAX_TILT * 2}deg) scale(1.07)`;

        if (card.style.transform === transform) return;
        card.style.transform = transform;
        card.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`);
        card.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`);

        if (card.style.transition !== 'none') {
            card.addEventListener('transitionend', () => { card.style.transition = 'none'; }, { once: true });
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transition = '';
        card.style.transform = '';
        card.style.setProperty('--glow-opacity', '0');
    }, []);

    return (
        <div ref={wrapperRef} className="ds-card-wrapper" onMouseEnter={handleMouseEnter} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div ref={cardRef} className="ds-card">
                <img src={logo} alt={logoAlt} className="ds-card__logo" />
                <img src={thumb} alt={logoAlt} className="ds-card__thumb" />
                <H4 className="ds-card__name">{system.name}</H4>
            </div>
        </div>
    );
};
