import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';
import { BuildOptions } from '../types/config';

interface BuildBabelLoaderPropsI extends BuildOptions {
    isTsx?: boolean;
}

// ? Декомпозиция babel loader;
export function buildBabelLoader({ isDev, isTsx }: BuildBabelLoaderPropsI) {
    return {
        // ? Разделение обработки файлов благодаря расширениям, теперь скорость сборки, сохранение и отображение изменений увеличена;
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    [
                        '@babel/plugin-transform-typescript',
                        {
                            isTsx,
                        },
                    ],
                    '@babel/plugin-transform-runtime',
                    // ? Запуск плагина на исключение атрибутов лишь в том случае, если файл с tsx-расширением;
                    isTsx && [
                        babelRemovePropsPlugin,
                        {
                            // ? Нужные атрибуты для исключения добавляются через запятую в массив ниже;
                            props: [
                                'data-testid',
                            ],
                        },
                    ],
                    isDev && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
            },
        },
    };
}
