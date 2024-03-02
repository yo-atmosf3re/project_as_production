import React, { memo } from 'react';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import { Button, BUTTON_THEME } from '@/shared/ui/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { THEME } from '@/shared/const/consts';

interface ThemeSwitcherPropsI {
    className?: string;
}
/**
 * Компонента, которая переключает цветовые темы во всём приложении;
 * @param className
 */
export const ThemeSwitcher: React.FC<ThemeSwitcherPropsI> = memo(
    ({ className }) => {
        const { theme, toggleTheme } = useTheme();

        return (
            <Button
                theme={BUTTON_THEME.CLEAR}
                className={classNames(cls.themeSwitcher, {}, [className])}
                onClick={toggleTheme}
            >
                {theme === THEME.DARK ? <DarkIcon /> : <LightIcon />}
            </Button>
        );
    },
);
