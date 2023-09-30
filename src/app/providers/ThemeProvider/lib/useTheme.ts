import { useContext } from 'react';
import { THEME, ThemeContext, LOCAL_STORAGE_THEME_KEY } from './ThemeContext';

interface UseThemeResult {
    toggleTheme: () => void;
    theme: THEME;
}

// ? Кастомный хук, который переключает темы в приложении, записывает в LS активную тему;
export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = (): void => {
        const newTheme: THEME = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
        setTheme(newTheme);
        // " Вешаем глобальный класс с цветовой темой для исключения лишних действий и переопределений;
        document.body.className = newTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme, toggleTheme,
    };
};
