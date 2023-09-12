import { BugButton } from 'app/providers/ErrorBoundary';
import React from 'react';
import { useTranslation } from 'react-i18next';

// ? Компонента, которая является главной страницей;
const MainPage = () => {
    const { t } = useTranslation('main');

    return (
        <div>
            {/* <BugButton /> */}
            {
                t('Главная страница')
            }
        </div>
    );
};

export default MainPage;
