import { addDecorator } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { TranslationDecorator } from '../../src/shared/config/storybook/TranslationDecorator/TranslationDecorator';
import { THEME } from '../../src/app/providers/ThemeProvider';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import '../../src/app/styles/index.scss';

// ? Конфигурация для Storybook. Объект parameters содержит настройки для различных функциональностей, например для actions и controls;
export const parameters = {
    // ? Указывает, какие аргументы событий будут показаны в интерфейсе Storybook. Здесь используется регулярное выражение ^on[A-Z].*, которое указывает, что все аргументы, начинающиеся с префикса "on" и далее идущих заглавных букв, будут отображаться;
    actions: { argTypesRegex: '^on[A-Z].*' },
    // ? Указывает, какие контролы (например, инпуты и селекторы) будут показаны для изменения значений пропсов компонентов;
    controls: {
        // ? Определение матчеров, в данном случае это color и date;
        matchers: {
            // ? Указывает, что контролы для изменения пропсов, относящихся к цвету (например, background-color или color), будут отображены;
            color: /(background|color)$/i,
            // ? Указывает, что контролы для изменения пропсов, оканчивающихся на "Date", будут отображены;
            date: /Date$/,
        },
    },
};

// ? addDecorator - функция добавления декораторов к Storybook;

// ? Добавляет декоратор для предоставления глобальных стилей сторисам во всем Storybook;
addDecorator(StyleDecorator);
// ? Добавляет декоратор для применения темы LIGHT ко всем сторисам в Storybook по-умолчанию, в самой сторис можно переназначить тему, воспользовавшись этим же декоратором;
addDecorator(ThemeDecorator(THEME.LIGHT));
// ? Добавляет декоратор для добавления маршрутизации к сторисам в Storybook. Используется, если в сторис нужны маршруты, URL-адреса для правильного функционирования;
addDecorator(RouterDecorator);
// ? Добавляет декоратор для добавления поддержки перевода сторисам в Storybook. Используется там где есть тексты, которые нужно перевести;
addDecorator(TranslationDecorator);
