import React, { ReactNode, useMemo } from 'react';
import { THEME_LS_KEY } from '@/shared/const/localstorage';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';
import { THEME } from '@/shared/const/consts';

// ? Const, которой присвоено значение из LS с использованием ключа THEME_LS_KEY, и если значение из LS не определено, то присваивается значение THEME.LIGHT по-умолчанию;
const DEFAULT_THEME =
    (localStorage.getItem(THEME_LS_KEY) as THEME) || THEME.LIGHT;

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
    const [theme, setTheme] = React.useState<THEME>(
        initialTheme || DEFAULT_THEME,
    );

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
