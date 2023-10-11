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
        'react-hooks',
    ],
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
        'react/jsx-props-no-spreading': 'off',
        // ? Отключаем правило, которое предлагает объявлять React-функциональные компоненты с ключевым словом function;
        'react/function-component-definition': 'off',
        // ? Проверяет используется ли описанный пропс в типе - в данный момент отключено. Работает по такому же принципу как и ошибка о неиспользуемых переменных;
        'react/no-unused-prop-types': 'off',
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
            'warn', {
                markupOnly: true,
                ignoreAttribute: [
                    'data-testid',
                    'to',
                    'keyReducer',
                ],
            },
        ],
        // ? Представляют собой ошибки, когда строка превышает заданное количество символов;
        'max-len': ['error', { code: 120, ignoreComments: true }],
        // ? Предупреждает об использовании статических элементов событий в JSX, которые могут быть непроходимы для людей с ограниченными возможностями. К примеру, если используется событие click на неподвижном элементе, то это может затруднить доступ для людей, которые не могут пользоваться мышью.;
        'jsx-a11y/no-static-element-interactions': 'off',
        // ? Требует добавления событий клавиш вместе с событием click в JSX. Это гарантирует, что элемент будет доступен как для пользователей, которые используют мышь, так и для пользователей, которые используют клавиатуру.;
        'jsx-a11y/click-events-have-key-events': 'off',
        // ? Управляет разрешением использовать ли методы console или нет;
        'no-console': 'off',
        // ? Включает наличие проверок для хуков;
        'react-hooks/rules-of-hooks': 'error',
        // ? Проверяет эффекты в зависимостях в хуках;
        'react-hooks/exhaustive-deps': 'warn',
        // ? Проверка на пустые интерфейсы/типы;
        '@typescript-eslint/no-empty-interface': 'off',
        // ? Отключает правило, которое не позволяет перезаписывать значения из аргументов функции. Это мешает работе redux-toolkit, потому что там можно работать с аргументом state напрямую в редьюсерах;
        'no-param-reassign': 'off',
        // ? ;
        'react/prop-types': 'off',
    },
    // ? Глобальные переменные, которые могут использоваться в любом месте, они задекларированы в global.d.ts;
    globals: {
        __IS_DEV__: true,
    },
    // ? Определяем правила для определенных файлов с определенным расширением;
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            // ? Отключаем правило, которое запрещает передачу текста напрямую внутри шаблонов i18next;
            rules: {
                'i18next/no-literal-string': 'off',
                'max-len': 'off',
            },
        },
    ],
};
