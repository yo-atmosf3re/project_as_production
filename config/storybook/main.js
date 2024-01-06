// ? Конфигурация для Storybook;
module.exports = {
    // ? Пути к файлам, содержащим истории в приложении;
    stories: [
        '../../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    // ? Дополнительные аддоны, которые будут установлены и активированы в Storybook;
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        'storybook-addon-mock/register',
    ],
    // ? Указывает, что используется React-фреймворк в Storybook;
    framework: '@storybook/react',
    // ? Здесь задается конфигурация для ядра Storybook. В данном случае определен builder webpack5, что указывает на использование Webpack 5 в сборке проекта в Storybook;
    core: {
        builder: 'webpack5',
    },
};
