import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { THEME } from '../../../const/consts';

interface UseThemeResult {
    toggleTheme: (saveAction?: (theme: THEME) => void) => void;
    theme: THEME;
}

// ? Кастомный хук, который переключает темы в приложении, записывает в LS активную тему;
export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    // ? Добавлена возможность, с помощью переданного необязательного коллбэка saveAction, использовать текущую тему;
    const toggleTheme = (saveAction?: (theme: THEME) => void) => {
        
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
        saveAction?.(newTheme);
    };

    return {
        theme: theme || THEME.LIGHT,
        toggleTheme,
    };
};
