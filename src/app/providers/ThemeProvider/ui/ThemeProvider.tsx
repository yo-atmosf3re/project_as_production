import React, { useMemo } from 'react';
import { LOCAL_STORAGE_THEME_KEY, THEME, ThemeContext } from '../lib/ThemeContext';

// ? Const, которой присвоено значение из LS с использованием ключа LOCAL_STORAGE_THEME_KEY, и если значение из LS не определено, то присваивается значение THEME.LIGHT;
const DEFAULT_THEME = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as THEME || THEME.LIGHT;

// ? Свойство initialTheme в данном интерфейсе позволяет установить изначальную тему самостоятельно, если тема не проинициализирована, то она устанавливается по-умолчанию;
interface ThemeProviderPropsI {
    initialTheme?: THEME;
}

// ? Обёртка в провайдер контекста, который ответственный за цветовые темы приложения;
export const ThemeProvider: React.FC<ThemeProviderPropsI> = ({
    children, initialTheme,
}) => {
    const [theme, setTheme] = React.useState<THEME>(initialTheme || DEFAULT_THEME);

    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};
