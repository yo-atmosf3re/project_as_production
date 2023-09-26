import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme, THEME } from 'app/providers/ThemeProvider';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import { Button } from 'shared/ui/Button';
import { BUTTON_THEME } from 'shared/ui/Button/ui/Button';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherPropsI {
   className?: string;
}

// ? Компонента, которая переключает цветовые темы во всём приложении;
export const ThemeSwitcher: React.FC<ThemeSwitcherPropsI> = ({
    className,
}) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={BUTTON_THEME.CLEAR}
            className={classNames(cls.themeSwitcher, {}, [className])}
            onClick={toggleTheme}
        >
            {
                theme === THEME.DARK
                    ? <DarkIcon />
                    : <LightIcon />
            }
        </Button>
    );
};
