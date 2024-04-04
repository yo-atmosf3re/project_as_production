import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './LangSwitcher.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Button as ButtonDeprecated,
    BUTTON_THEME,
} from '@/shared/ui/deprecated/Button';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

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

        const toggleLanguageHandler = () => {
            i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
        };

        const deprecatedLangSwitcher = (
            <ButtonDeprecated
                className={classNames(cls.langSwitcher, {}, [className])}
                theme={BUTTON_THEME.CLEAR_INVERTED}
                onClick={toggleLanguageHandler}
            >
                {t(!short ? 'Короткий язык' : 'Язык')}
            </ButtonDeprecated>
        );

        return (
            <ToggleFeatures
                on={
                    <Button variant="clear">
                        {t(!short ? 'Короткий язык' : 'Язык')}
                    </Button>
                }
                off={deprecatedLangSwitcher}
                feature="isAppRedesigned"
            />
        );
    },
);
