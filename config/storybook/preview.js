import { addDecorator } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { TranslationDecorator } from '../../src/shared/config/storybook/TranslationDecorator/TranslationDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import '../../src/app/styles/index.scss';
import { THEME } from '../../src/shared/const/consts';

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
    // ? Удаление лишних отступов с помощью растяжения сторис на всю возможную ширину и высоту в блоке, где показывается сама сторис;
    layout: 'full',
};

// ? addDecorator - функция добавления декораторов к Storybook;

// ? Добавляет декоратор для предоставления глобальных стилей сторисам во всем Storybook;
addDecorator(StyleDecorator);
// Добавляет декоратор для добавления поддержки перевода сторисам в Storybook. Используется там где есть тексты, которые нужно перевести;
addDecorator(TranslationDecorator);
// ? Добавляет декоратор для применения темы LIGHT ко всем сторисам в Storybook по-умолчанию, в самой сторис можно переназначить тему, воспользовавшись этим же декоратором;
addDecorator(ThemeDecorator(THEME.LIGHT));
// ? Добавляет декоратор для добавления маршрутизации к сторисам в Storybook. Используется, если в сторис нужны маршруты, URL-адреса для правильного функционирования;
addDecorator(RouterDecorator);
// ? Добавляет декоратор, который оборачивает сторис в Suspense реакта;
addDecorator(SuspenseDecorator);
