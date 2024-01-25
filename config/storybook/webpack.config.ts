/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import path from 'path';
import { BuildPaths } from '../build/types/config';
import { buildCssLoader } from '../build/loaders/buildCssLoaders';

// ? Экспортируем функцию по умолчанию, которая принимает объект config со свойством типа webpack.Configuration;
export default ({ config }: { config: webpack.Configuration }) => {
    // ? Создаем объект paths с заданными ключами и значениями;
    const paths: BuildPaths = {
        // ? Путь к папке сборки;
        build: '',
        // ? Путь к HTML-файлу;
        html: '',
        // ? Путь к точке входа приложения;
        entry: '',
        // ? Путь к папке исходных файлов;
        src: path.resolve(__dirname, '..', '..', 'src'),
        buildLocales: '',
        locales: '',
    };
    // ? Добавляем путь к папке исходных файлов в список папок, которые webpack будет искать при разрешении модулей;
    config!.resolve!.modules!.push(paths.src);
    // ? Добавляем расширения файлов, которые webpack будет искать при разрешении модулей;
    config!.resolve!.extensions!.push('.ts', '.tsx');
    // ? Поддержка проектного алиаса. Разворачиваем старые алиасы, а затем добавляем новые;
    config!.resolve!.alias = {
        ...config.resolve!.alias,
        '@': paths.src,
    };

    // ? Используем метод map() для изменения массива правил конфигурации модуля;
    // ? В каждом правиле ищем совпадение с регулярным выражением для SVG-файлов;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config!.module!.rules = config!.module!.rules!.map((rule: RuleSetRule) => {
        // ? Если найдено совпадение;
        if (/svg/.test(rule.test as string)) {
            // ? Добавляем исключение для SVG-файлов;
            return { ...rule, exclude: /\.svg$/i };
        }

        // ? Возвращаем неизмененное правило;
        return rule;
    });

    // ? Добавляем новое правило для обработки SVG-файлов;
    config!.module!.rules.push({
        // ? Регулярное выражение для SVG-файлов;
        test: /\.svg$/,
        // ? Массив лоадеров, которые будут использоваться для обработки SVG-файлов;
        use: ['@svgr/webpack'],
    });
    // ? Добавляем правило для обработки CSS-файлов через функцию buildCssLoader;
    config!.module!.rules.push(buildCssLoader(true));

    // ? Добавляем новый плагин DefinePlugin, который будет задавать глобальную переменную __IS_DEV__ со значением true;
    config!.plugins!.push(new DefinePlugin({
        __IS_DEV__: true,
        __API__: JSON.stringify(''),
        __PROJECT__: JSON.stringify('storybook'),
    }));

    // ? Возвращаем измененный объект конфигурации;
    return config;
};
