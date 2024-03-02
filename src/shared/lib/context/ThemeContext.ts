/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import { THEME } from '../../const/consts';

export interface ThemeContextPropsI {
    theme?: THEME;
    setTheme?: (theme: THEME) => void;
}

// ? Создаёт контекст, связанный с цветовыми темами приложения;
export const ThemeContext = createContext<ThemeContextPropsI>({});
