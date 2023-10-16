import { useContext } from 'react';
import { THEME_LS_KEY } from 'shared/const/localstorage';
import { THEME, ThemeContext } from './ThemeContext';

interface UseThemeResult {
    toggleTheme: () => void;
    theme: THEME;
}

// ? Кастомный хук, который переключает темы в приложении, записывает в LS активную тему;
export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = (): void => {
        const newTheme: THEME = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
        setTheme?.(newTheme);
        // " Вешаем глобальный класс с цветовой темой для исключения лишних действий и переопределений;
        document.body.className = newTheme;
        localStorage.setItem(THEME_LS_KEY, newTheme);
    };

    return {
        theme: theme || THEME.LIGHT,
        toggleTheme,
    };
};
