/* eslint-disable no-unused-vars */
import { createContext } from 'react';

export enum THEME {
   LIGHT = 'app_light_theme',
   DARK = 'app_dark_theme'
}

export interface ThemeContextPropsI {
   theme?: THEME;
   setTheme?: (theme: THEME) => void;
}

// ? Создаёт контекст, связанный с цветовыми темами приложения;
export const ThemeContext = createContext<ThemeContextPropsI>({});

export const LOCAL_STORAGE_THEME_KEY = 'theme';
