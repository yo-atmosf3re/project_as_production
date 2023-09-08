import { Story } from '@storybook/react';
import { THEME } from 'app/providers/ThemeProvider';

// ? Декоратор для определения тем приложения в сторисах, передаём нужный для нас theme конкретной сторис: оборачиваем сторис в класс с нужной темой;
export const ThemeDecorator = (theme: THEME) => (StoryComponent: Story) => (
    <div className={`app ${theme}`}>
        <StoryComponent />
    </div>
);
