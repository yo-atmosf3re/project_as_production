import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// ? Подключение Vite, который в разы ускоряет сборку проекта между изменениями во время разработки;
export default defineConfig({
    plugins: [
        // ? Поддержка svg;
        svgr({
            // ? Поддержка дефолтных экспортов, потому что на проекте используются экспорты по-дефолту для svg, а плагин по-умолчанию поддерживает только именовые экспорты;
            exportAsDefault: true,
        }),
        // ? Поддержка React JS;
        react(),
    ],
    resolve: {
        // ? Поддержка и детекция алиаса;
        alias: [
            {
                find: '@',
                replacement: '/src',
            },
        ],
    },
    // ? Определение переменных окружения, для простоты работы в них уже переданы значения для работы в dev-режиме;
    define: {
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('http://localhost:7777'),
        __PROJECT__: JSON.stringify('frontend'),
    },
});
