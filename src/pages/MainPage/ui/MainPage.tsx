import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';

/**
 * Компонента, которая является главной страницей;
 */
const MainPage = () => {
    const { t } = useTranslation('main');

    return (
        <Page>
            {
                t('Главная страница')
            }
        </Page>
    );
};

export default MainPage;
