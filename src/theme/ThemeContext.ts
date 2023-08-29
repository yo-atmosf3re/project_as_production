import { createContext } from "react";

export enum THEME {
   LIGHT = 'light',
   DARK = 'dark'
}

export interface ThemeContextPropsI {
   theme?: THEME;
   setTheme?: (theme: THEME) => void;
}

export const ThemeContext = createContext<ThemeContextPropsI>({});

export const LOCAL_STORAGE_THEME_KEY = 'theme';