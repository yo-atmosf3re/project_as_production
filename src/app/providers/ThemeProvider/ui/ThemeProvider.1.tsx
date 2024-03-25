import React, { useEffect, useMemo } from 'react';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';
import { THEME } from '@/shared/const/consts';
import { useJsonSettings } from '@/entities/User';
import { ThemeProviderPropsI } from './ThemeProvider';

// ? Обёртка в провайдер контекста, который ответственный за цветовые темы приложения;

export const ThemeProvider: React.FC<ThemeProviderPropsI> = ({
    children,
    initialTheme,
}) => {
    const { theme: defaultTheme = THEME.LIGHT } = useJsonSettings();

    const [theme, setTheme] = useState<THEME>(initialTheme || defaultTheme);

    useEffect(() => {
        setTheme(defaultTheme);
    }, [defaultTheme]);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};
