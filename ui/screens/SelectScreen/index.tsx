import React, { useCallback, useEffect, useState } from 'react';
import './index.css';
import { Button, BodyS, Spinner } from '@salutejs/sdds-serv';
import type { DesignSystem, FlowType } from 'types';
import { getDesignSystems } from '../../helpers/designSystems';
import { LogViewer } from '../../components';

interface SelectScreenProps {
    flow: FlowType;
    onSelect: (system: DesignSystem) => void;
}

export const SelectScreen: React.FC<SelectScreenProps> = ({ flow, onSelect }) => {
    const title = flow === 'import' ? 'Выберите дизайн-систему для импорта' : 'Выберите дизайн-систему для экспорта';

    const [designSystems, setDesignSystems] = useState<DesignSystem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDesignSystems = useCallback(() => {
        setLoading(true);
        setError(null);
        getDesignSystems()
            .then(setDesignSystems)
            .catch((e: Error) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchDesignSystems();
    }, [fetchDesignSystems]);

    if (loading) {
        return (
            <div className="select-screen select-screen--loading">
                <Spinner size={48} />
            </div>
        );
    }

    return (
        <div className="select-screen">
            <BodyS className="select-screen__title">{title}</BodyS>
            {!error && !loading && (
                <div className="select-screen__list">
                    {designSystems.map((system) => (
                        <Button
                            size="s"
                            key={system.id}
                            stretching="filled"
                            view="secondary"
                            onClick={() => onSelect(system)}
                        >
                            {system.projectName}
                        </Button>
                    ))}
                </div>
            )}
            {error && (
                <>
                    <Button size="s" stretching="filled" onClick={fetchDesignSystems}>
                        Повторить запрос
                    </Button>
                    <LogViewer logs={[error]} />
                </>
            )}
        </div>
    );
};
