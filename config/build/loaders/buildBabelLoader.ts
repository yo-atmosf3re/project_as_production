import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';
import { BuildOptions } from '../types/config';

interface BuildBabelLoaderPropsI extends BuildOptions {
    isTsx?: boolean;
}

// ? Декомпозиция babel loader;
export function buildBabelLoader({ isDev, isTsx }: BuildBabelLoaderPropsI) {
    // ? Флаг, сигнализируищий в каком режиме сборка - dev или prod;
    const isProd = !isDev;

    return {
        // ? Разделение обработки файлов благодаря расширениям, теперь скорость сборки, сохранение и отображение изменений увеличена;
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                presets: ['@babel/preset-env'],
                plugins: [
                    [
                        '@babel/plugin-transform-typescript',
                        {
                            isTsx,
                        },
                    ],
                    '@babel/plugin-transform-runtime',
                    // ? Запуск плагина на исключение атрибутов лишь в том случае, если файл с tsx-расширением и prod-сборка;
                    isTsx
                    && isProd && [
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
