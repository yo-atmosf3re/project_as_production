import React, { useEffect, useState } from 'react';
import { Button } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';

// ? Компонент для тестирования ErrorBoundary;
export const BugButton: React.FC = () => {
    const { t } = useTranslation();
    const [error, setError] = useState<boolean>(false);

    const throwErrorHandle = () => setError(true);

    useEffect(() => {
        if (error) {
            throw new Error('Some error');
        }
    }, [error]);

    return (
        <Button
            onClick={throwErrorHandle}
        >
            {
                t('throw error')
            }
        </Button>
    );
};
