import { useContext } from 'react';
import { THEME_LS_KEY } from '../../../const/localstorage';
import { ThemeContext } from '../../context/ThemeContext';
import { THEME } from '../../../const/consts';

interface UseThemeResult {
    toggleTheme: () => void;
    theme: THEME;
}

// ? Кастомный хук, который переключает темы в приложении, записывает в LS активную тему;
export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = (): void => {
        // const newTheme: THEME = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;

        // ? Добавление больше двух подразумевает под собой использование более удобной конструкции с switch-case;
        let newTheme: THEME;

        switch (theme) {
        case THEME.DARK:
            newTheme = THEME.LIGHT;
            break;
        case THEME.LIGHT:
            newTheme = THEME.JUNGLE;
            break;
        case THEME.JUNGLE:
            newTheme = THEME.DARK;
            break;
        default:
            newTheme = THEME.LIGHT;
        }
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
