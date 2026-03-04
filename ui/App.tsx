import React, { useState } from 'react';
import { PopupProvider, Tabs, TabItem, Button } from '@salutejs/sdds-serv';
import type { Screen, FlowType, ResultState, DesignSystem, RemoteStyleData } from 'types';
import { CONSTANTS } from 'utils/constants';
import { pixsoEventBus } from './helpers/pixso';
import { useScreenTransition } from './hooks/useScreenTransition';
import { HomeScreen } from './screens/HomeScreen';
import { SelectScreen } from './screens/SelectScreen';
import { ConfirmScreen } from './screens/ConfirmScreen';
import { ResultScreen } from './screens/ResultScreen';
import './app.css';

// TODO: заменить на реальные URL
const IMPORT_URL = (systemId: string) => `https://ds-builder.example.com/api/v1/themes/${systemId}/paint-styles`;
const EXPORT_URL = (systemId: string) => `https://ds-builder.example.com/api/v1/themes/${systemId}/paint-styles`;

const App = () => {
    const { screen, prevScreen, direction, navigate, onExited } = useScreenTransition('home');
    const [flow, setFlow] = useState<FlowType>('import');
    const [selectedSystem, setSelectedSystem] = useState<DesignSystem | null>(null);
    const [resultState, setResultState] = useState<ResultState>('loading');
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
        setLogs((prev) => [...prev, `- ${message}`]);
    };

    const handleTabChange = (newFlow: FlowType) => {
        setFlow(newFlow);
        if (screen !== 'home') {
            navigate('home', 'back');
        }
    };

    const onBack = () => {
        let prevForBack: Screen = 'home';

        switch (screen) {
            case 'select':
                prevForBack = 'home';
                break;
            case 'confirm':
                prevForBack = 'select';
                break;
            case 'result':
                prevForBack = 'confirm';
                break;
            default:
                prevForBack = 'home';
                break;
        }

        navigate(prevForBack, 'back');
    };

    const handleSystemSelect = (system: DesignSystem) => {
        setSelectedSystem(system);
        navigate('confirm', 'forward');
    };

    const handleConfirm = () => {
        const timeStamp = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'short', timeStyle: 'short' }).format(
            new Date(),
        );

        setResultState('loading');
        setLogs([`*** ${timeStamp} ***`]);
        navigate('result', 'forward');
        if (flow === 'import') {
            startImport();
        } else {
            startExport();
        }
    };

    const startImport = async () => {
        addLog('Загрузка данных из DS-Builder...');
        try {
            const response = await fetch(IMPORT_URL(selectedSystem!.id));
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data: RemoteStyleData[] = await response.json();
            addLog(`Получено ${data.length} стилей. Применение в Pixso...`);

            const handleStylesImported = (message: { data: { created: number; updated: number } }) => {
                const { created, updated } = message.data;
                addLog(`Создано: ${created}, обновлено: ${updated}`);
                setResultState('success');
                pixsoEventBus.off(CONSTANTS.msgType.stylesImported, handleStylesImported);
            };

            pixsoEventBus.on(CONSTANTS.msgType.stylesImported, handleStylesImported);
            parent.postMessage({ pluginMessage: { type: CONSTANTS.msgType.importStyles, data } }, '*');
        } catch (error) {
            addLog(`Ошибка: ${error instanceof Error ? error.message : 'неизвестная ошибка'}`);
            setResultState('error');
        }
    };

    const startExport = () => {
        addLog('Сбор локальных стилей...');

        const handleStylesForExport = async (message: { data: object[] }) => {
            pixsoEventBus.off(CONSTANTS.msgType.localStylesForExport, handleStylesForExport);
            addLog(`Собрано ${message.data.length} стилей. Выгрузка в DS-Builder...`);

            try {
                const response = await fetch(EXPORT_URL(selectedSystem!.id), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(message.data),
                });
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                addLog(`Выгружено ${message.data.length} стилей`);
                setResultState('success');
            } catch (error) {
                addLog(`Ошибка: ${error instanceof Error ? error.message : 'неизвестная ошибка'}`);
                setResultState('error');
            }
        };

        pixsoEventBus.on(CONSTANTS.msgType.localStylesForExport, handleStylesForExport);
        parent.postMessage({ pluginMessage: { type: CONSTANTS.msgType.getLocalStylesForExport } }, '*');
    };

    const handleClose = () => {
        parent.postMessage({ pluginMessage: { type: CONSTANTS.msgType.closePlugin } }, '*');
    };

    const renderScreen = (s: Screen) => {
        switch (s) {
            case 'home':
                return <HomeScreen flow={flow} onStart={() => navigate('select', 'forward')} />;
            case 'select':
                return <SelectScreen flow={flow} onSelect={handleSystemSelect} />;
            case 'confirm':
                return selectedSystem ? (
                    <ConfirmScreen
                        flow={flow}
                        system={selectedSystem}
                        onBack={() => navigate('select', 'back')}
                        onConfirm={handleConfirm}
                    />
                ) : null;
            case 'result':
                return <ResultScreen flow={flow} resultState={resultState} logs={logs} onClose={handleClose} />;
        }
    };

    return (
        <PopupProvider>
            <div className="plugin-container">
                <div className="tabs-header">
                    {screen === 'home' ? (
                        <Tabs size="xs" view="clear">
                            <TabItem
                                size="xs"
                                view="clear"
                                isActive={flow === 'import'}
                                onClick={() => handleTabChange('import')}
                            >
                                Импорт
                            </TabItem>
                            <TabItem
                                size="xs"
                                view="clear"
                                isActive={flow === 'export'}
                                onClick={() => handleTabChange('export')}
                            >
                                Экспорт
                            </TabItem>
                        </Tabs>
                    ) : (
                        <Button size="xs" view="clear" contentPlacing="relaxed" onClick={onBack}>
                            ← Назад
                        </Button>
                    )}
                </div>
                <div className="screen-content">
                    {prevScreen && (
                        <div className={`screen-anim screen-anim--exit-${direction}`} onAnimationEnd={onExited}>
                            {renderScreen(prevScreen)}
                        </div>
                    )}
                    <div className={`screen-anim${prevScreen ? ` screen-anim--enter-${direction}` : ''}`}>
                        {renderScreen(screen)}
                    </div>
                </div>
            </div>
        </PopupProvider>
    );
};

export default App;
