import React, { useMemo } from 'react';
import { LOCAL_STORAGE_THEME_KEY, THEME, ThemeContext } from '../lib/ThemeContext';

// ? Const, которой присвоено значение из LS с использованием ключа LOCAL_STORAGE_THEME_KEY, и если значение из LS не определено, то присваивается значение THEME.LIGHT;
const DEFAULT_THEME = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as THEME || THEME.LIGHT;

// ? Обёртка в провайдер контекста, который ответственный за цветовые темы приложения;
export const ThemeProvider: React.FC = ({
    children,
}) => {
    const [theme, setTheme] = React.useState<THEME>(DEFAULT_THEME);

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
