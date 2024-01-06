import { Story } from '@storybook/react';
import { THEME, ThemeProvider } from 'app/providers/ThemeProvider';

/**
 * Декоратор для определения тем приложения в сторисах, передаём нужный для нас theme конкретной сторис: оборачиваем сторис в ThemeProvider (для того, чтобы можно было тестировать компоненты с привязкой к темам при использовании в сторисах useTheme, даёт возможность проинициализировать тему самостоятельно), затем в класс с нужной темой;
 * @param theme
 */
export const ThemeDecorator = (theme: THEME) => (StoryComponent: Story) => (
    <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`}>
            <StoryComponent />
        </div>
    </ThemeProvider>
);
