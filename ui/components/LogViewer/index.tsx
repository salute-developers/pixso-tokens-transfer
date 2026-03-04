import React, { useState } from 'react';
import './index.css';
import { Button, IconButton, Sheet, BodyM } from '@salutejs/sdds-serv';
import { IconCopy, IconClose } from '@salutejs/plasma-icons';

interface LogViewerProps {
    logs: string[];
}

export const LogViewer: React.FC<LogViewerProps> = ({ logs }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCopy = () => {
        const text = logs.join('\n');
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
        document.body.appendChild(textarea);
        textarea.select();
        // navigator.clipboard недоступен в null-origin iframe (Pixso), используем execCommand
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        document.execCommand('copy');
        document.body.removeChild(textarea);
    };

    return (
        <>
            <Button size="s" stretching="filled" view="secondary" onClick={() => setIsOpen(true)}>
                Журнал операций
            </Button>
            <Sheet
                opened={isOpen}
                onClose={() => setIsOpen(false)}
                hasHandle={false}
                withOverlay
                isHeaderFixed
                contentHeader={
                    <div className="log-viewer__header">
                        <BodyM bold>Журнал операций</BodyM>
                        <div className="log-viewer__header-actions">
                            <IconButton view="clear" size="xs" onClick={handleCopy}>
                                <IconCopy size="xs" />
                            </IconButton>
                            <IconButton view="clear" size="xs" onClick={() => setIsOpen(false)}>
                                <IconClose size="xs" />
                            </IconButton>
                        </div>
                    </div>
                }
            >
                <pre className="log-viewer__text">{logs.join('\n')}</pre>
            </Sheet>
        </>
    );
};
