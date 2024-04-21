import { Story } from '@storybook/react';
// ? Это не бизнес код, поэтому добавление исключения вполне себе оправданное действие;
// eslint-disable-next-line yo-plugin/layer-imports
import ThemeProvider from '@/app/providers/ThemeProvider';
import { THEME } from '@/shared/const/consts';

/**
 * Декоратор для определения тем приложения в сторисах, передаём нужный для нас theme конкретной сторис: оборачиваем сторис в ThemeProvider (для того, чтобы можно было тестировать компоненты с привязкой к темам при использовании в сторисах useTheme, даёт возможность проинициализировать тему самостоятельно), затем в класс с нужной темой;
 * @param theme
 */
export const ThemeDecorator = (theme: THEME) => (StoryComponent: Story) =>
    (
        <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>
                <StoryComponent />
            </div>
        </ThemeProvider>
    );
