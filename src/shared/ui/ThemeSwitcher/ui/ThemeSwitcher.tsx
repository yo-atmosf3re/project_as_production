import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';
import { useTheme, THEME } from 'app/providers/ThemeProvider';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import { Button } from 'shared/ui/Button';
import { THEME_BUTTON } from 'shared/ui/Button/ui/Button';

interface ThemeSwitcherPropsI {
   className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherPropsI> = ({
   className
}) => {

   const { theme, toggleTheme } = useTheme();

   return (
      <Button
         theme={THEME_BUTTON.CLEAR}
         className={classNames(cls.themeSwitcher, {}, [className])}
         onClick={toggleTheme}
      >
         {
            theme === THEME.DARK
               ? <DarkIcon />
               : <LightIcon />
         }
      </Button>
   )
}