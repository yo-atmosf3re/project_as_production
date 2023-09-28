import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';
import { BUTTON_THEME } from 'shared/ui/Button/ui/Button';
import cls from './LangSwitcher.module.scss';

interface LangSwitcherPropsI {
   className?: string;
   short?: boolean;
}

// ? Компонента, которая отвечает за переключение языка на проекте;
export const LangSwitcher: React.FC<LangSwitcherPropsI> = ({
    className, short,
}) => {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            className={classNames(cls.langSwitcher, {}, [className])}
            theme={BUTTON_THEME.CLEAR_INVERTED}
            onClick={toggleLanguage}
        >
            {
                t(!short ? 'Короткий язык' : 'Язык')
            }
        </Button>
    );
};
