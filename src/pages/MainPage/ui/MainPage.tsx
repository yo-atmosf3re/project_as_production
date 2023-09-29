import { Counter } from 'entitites/Counter';
import React from 'react';
import { useTranslation } from 'react-i18next';

// ? Компонента, которая является главной страницей;
const MainPage = () => {
    const { t } = useTranslation('main');

    return (
        <div>
            {
                t('Главная страница')
            }
            <Counter />
        </div>
    );
};

export default MainPage;
