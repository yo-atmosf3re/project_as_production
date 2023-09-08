import React from 'react';
import { useTranslation } from 'react-i18next';

// ? Компонента с информацией о приложении;
const AboutPage = () => {
    const { t } = useTranslation('about');
    return (
        <div>
            {
                t('o-saite')
            }
        </div>
    );
};

export default AboutPage;
