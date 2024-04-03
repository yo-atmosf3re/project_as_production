import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './LangSwitcher.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, BUTTON_THEME } from '@/shared/ui/deprecated/Button';

interface LangSwitcherPropsI {
    className?: string;
    short?: boolean;
}

/**
 * Компонента, которая отвечает за переключение языков на проекте;
 * @param className
 * @param short - флаг, который отвечает за отображение надписи текущего языка в коротком или длинном виде;
 */
export const LangSwitcher: React.FC<LangSwitcherPropsI> = memo(
    ({ className, short }) => {
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
                {t(!short ? 'Короткий язык' : 'Язык')}
            </Button>
        );
    },
);