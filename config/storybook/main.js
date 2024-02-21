// ? Конфигурация для Storybook;
module.exports = {
    // ? Пути к файлам, содержащим истории в приложении;
    stories: [
        '../../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    // ? Дополнительные аддоны, которые будут установлены и активированы в Storybook;
    addons: [
        '@storybook/addon-links',
        // ? Отключение возможности управления цветовыми темами в основном аддоне, который содержит в себе встроенный функционал по управлению этими темами;
        {
            name: '@storybook/addon-essentials',
            options: {
                backgrounds: false,
            },
        },
        '@storybook/addon-interactions',
        'storybook-addon-mock/register',
        // ? Дополнительный аддон для установки цветовых тем, которые можно будет переключать с помощью интерфейса Storybook;
        'storybook-addon-themes',
    ],
    // ? Указывает, что используется React-фреймворк в Storybook;
    framework: '@storybook/react',
    // ? Здесь задается конфигурация для ядра Storybook. В данном случае определен builder webpack5, что указывает на использование Webpack 5 в сборке проекта в Storybook;
    core: {
        builder: 'webpack5',
    },
};
