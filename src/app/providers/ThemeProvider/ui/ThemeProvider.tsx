import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';
import { THEME } from '@/shared/const/consts';
import { useJsonSettings } from '@/entities/User';
import { THEME_LS_KEY } from '@/shared/const/localstorage';

// ? Const, которой присвоено значение из LS с использованием ключа THEME_LS_KEY, и если значение из LS не определено, то присваивается значение THEME.LIGHT по-умолчанию;

// ? Свойство initialTheme в данном интерфейсе позволяет установить изначальную тему самостоятельно, если тема не проинициализирована, то она устанавливается по-умолчанию;
interface ThemeProviderPropsI {
    initialTheme?: THEME;
    children: ReactNode;
}

// ? Последняя цветовая тема, установленная пользователем, которая в дальнейшем инициализируется в стейте самого провайдера;
const fallbackTheme = localStorage.getItem(THEME_LS_KEY) as THEME;

// ? Обёртка в провайдер контекста, который ответственный за цветовые темы приложения;
export const ThemeProvider: React.FC<ThemeProviderPropsI> = ({
    children,
    initialTheme,
}) => {
    const { theme: defaultTheme } = useJsonSettings();

    const [isThemeInited, setIsThemeInited] = useState<boolean>(false);
    const [theme, setTheme] = useState<THEME>(
        initialTheme || fallbackTheme || THEME.LIGHT,
    );

    useEffect(() => {
        if (!isThemeInited && defaultTheme) {
            setTheme(defaultTheme);
            setIsThemeInited(true);
        }
    }, [defaultTheme, isThemeInited]);

    useEffect(() => {
        document.body.className = theme;
        // ? Сохранение сохранение последней цветовой темы пользователя после её изменения;
        localStorage.setItem(THEME_LS_KEY, theme);
    }, [theme]);

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
