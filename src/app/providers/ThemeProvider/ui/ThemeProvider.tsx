import React, { useMemo } from 'react';
import { LOCAL_STORAGE_THEME_KEY, THEME, ThemeContext } from '../lib/ThemeContext';

const DEFAULT_THEME = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as THEME || THEME.LIGHT;

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
