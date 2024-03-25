import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';
import { THEME } from '@/shared/const/consts';
import { useJsonSettings } from '@/entities/User';

// ? Const, которой присвоено значение из LS с использованием ключа THEME_LS_KEY, и если значение из LS не определено, то присваивается значение THEME.LIGHT по-умолчанию;

// ? Свойство initialTheme в данном интерфейсе позволяет установить изначальную тему самостоятельно, если тема не проинициализирована, то она устанавливается по-умолчанию;
interface ThemeProviderPropsI {
    initialTheme?: THEME;
    children: ReactNode;
}

// ? Обёртка в провайдер контекста, который ответственный за цветовые темы приложения;
export const ThemeProvider: React.FC<ThemeProviderPropsI> = ({
    children,
    initialTheme,
}) => {
    const { theme: defaultTheme = THEME.LIGHT } = useJsonSettings();

    const [isThemeInited, setIsThemeInited] = useState<boolean>(false);
    const [theme, setTheme] = useState<THEME>(initialTheme || defaultTheme);

    useEffect(() => {
        if (!isThemeInited) {
            setTheme(defaultTheme);
            setIsThemeInited(true);
        }
    }, [defaultTheme, isThemeInited]);

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
