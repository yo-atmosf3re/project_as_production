module.exports = {
    // ? Определяем окружение, в котором будет работать код;
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    // ? Импортируем и расширяем наборы правил для проверки кода;
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    // ? Указываем парсер, который будет использоваться для анализа кода;
    parser: '@typescript-eslint/parser',
    // ? Определяем параметры парсера;
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    // ? Подключаем плагины;
    plugins: [
        'react',
        '@typescript-eslint',
        'i18next',
    ],
    // ? Определяем правила проверки кода;
    // rules: {
    //     // ? Приводят к предупреждению или ошибке, когда код нарушает правилу отступов в JSX;
    //     'react/jsx-indent': [2, 4],
    //     'react/jsx-indent-props': [2, 4],
    //     indent: [2, 4],
    //     'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
    //     'import/no-unresolved': 'off',
    //     'import/prefer-default-export': 'off',
    //     'no-unused-vars': 'warn',
    //     'react/require-default-props': 'off',
    //     'react/react-in-jsx-scope': 'off',
    //     'react/jsx-props-no-spreading': 'warn',
    //     'react/function-component-definition': 'off',
    //     'no-shadow': 'off',
    //     'import/extensions': 'off',
    //     'import/no-extraneous-dependencies': 'off',
    //     'linebreak-style': ['off', 'windows'],
    //     'no-underscore-dangle': 'off',
    //     'i18next/no-literal-string': [
    //         'error', {
    //             markupOnly: true,
    //             ignoreAttribute: [
    //                 'data-testid',
    //                 'to',
    //             ],
    //         }],
    //     'max-len': ['error', { code: 120, ignoreComments: true }],
    // },
    rules: {
        // ? Приводят к предупреждению или ошибке, когда код нарушает правилу отступов в JSX (2 пробела);
        'react/jsx-indent': [2, 4],
        // ? Приводят к предупреждению или ошибке, когда код нарушает правило отступа в атрибутах JSX (2 пробела);
        'react/jsx-indent-props': [2, 4],
        // ? Приводят к предупреждению или ошибке, когда код нарушает правило отступа (2 пробела);
        indent: [2, 4],
        // ? Приводят к предупреждению или ошибке, когда код нарушает правило расширения файлов JSX (разрешены .js, .jsx, .tsx);
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
        // ? Отключаем правило, которое предлагает добавить расширение импортируемого файла при его отсутствии;
        'import/no-unresolved': 'off',
        // ? Отключаем правило, которое предлагает использовать экспорт по умолчанию, вместо именованного экспорта;
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        // ? Представляют собой тайпскриптовые предупреждения об неиспользуемых переменных
        // ? Представляют собой предупреждения об неиспользуемых переменных;
        'no-unused-vars': 'off',
        // ? Отключаем правило, которое предлагает добавить значение по умолчанию для необязательных пропсов в React-компонентах;
        'react/require-default-props': 'off',
        // ? Отключаем правило, которое предотвращает использование React без импорта;
        'react/react-in-jsx-scope': 'off',
        // ? Представляют собой предупреждения о распространении пропсов с помощью оператора ...;
        'react/jsx-props-no-spreading': 'warn',
        // ? Отключаем правило, которое предлагает объявлять React-функциональные компоненты с ключевым словом function;
        'react/function-component-definition': 'off',
        // ? Отключаем правило, которое предлагает не использовать одинаковые имена переменных в разных областях видимости;
        'no-shadow': 'off',
        // ? Отключаем правило, которое предлагает добавить расширение импортируемого файла при его отсутствии;
        'import/extensions': 'off',
        // ? Отключаем правило, которое предлагает добавить несуществующие зависимости;
        'import/no-extraneous-dependencies': 'off',
        // ? Отключаем правило, которое предотвращает ошибки перелома строк (используется в ОС Windows);
        'linebreak-style': ['off', 'windows'],
        // ? Отключаем правило, которое запрещает использование символа подчеркивания в идентификаторах;
        'no-underscore-dangle': 'off',
        // ? Представляют собой ошибки, когда текст передают напрямую внутри шаблонов i18next;
        'i18next/no-literal-string': [
            'error', {
                markupOnly: true,
                ignoreAttribute: [
                    'data-testid',
                    'to',
                ],
            }],
        // ? Представляют собой ошибки, когда строка превышает заданное количество символов;
        'max-len': ['error', { code: 120, ignoreComments: true }],
    },
    // ? Глобальные переменные, которые могут использоваться в любом месте, они задекларированы в global.d.ts;
    globals: {
        __IS_DEV__: true,
    },
    // ? Определяем правила для определенных файлов с определенным расширением;
    overrides: [
        {
            files: ['**/src/**/*.test.{ts,tsx}'],
            // ? Отключаем правило, которое запрещает передачу текста напрямую внутри шаблонов i18next;
            rules: {
                'i18next/no-literal-string': 'off',
            },
        },
    ],
};
