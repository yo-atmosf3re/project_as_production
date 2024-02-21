/* eslint-disable @typescript-eslint/no-var-requires */

// ? Импорт модулей Node.js для работы с файловой системой и путями;
const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const firstCharUpperCase = require('../firstCharUpperCase');
const componentTemplate = require('./componentTemplate');
const storyTemplate = require('./storyTemplate');
const styleTemplate = require('./styleTemplate');

// ? Экспорт асинхронной функции, которая создает структуру файлов и директорий для нового UI-компонента;

// ? Пример использования:
// ? await module.exports('features', 'mySlice');
// ? Результат: создание необходимых файлов и директорий для нового UI-компонента в слое 'features'.
module.exports = async (layer, sliceName) => {
    // ? Функция, возвращающая абсолютный путь к директории UI сегмента;
    const resolveUIPath = (...segments) => resolveRoot('src', layer, sliceName, 'ui', ...segments);

    // ? Функция для создания директории UI;
    const createUIDir = async () => {
        try {
            await fs.mkdir(resolveUIPath());
        } catch (e) {
            console.log('Не удалось создать UI директорию');
        }
    };

    // ? Функция для создания файлов компонента, его истории и стилей;
    const createComponent = async () => {
        try {
            const componentName = firstCharUpperCase(sliceName);
            // ? Создание директории для компонента;
            await fs.mkdir(resolveUIPath(componentName));
            // ? Создание файла компонента с использованием шаблона;
            await fs.writeFile(
                resolveUIPath(componentName, `${componentName}.tsx`),
                componentTemplate(componentName),
            );
            // ? Создание файла истории компонента с использованием шаблона;
            await fs.writeFile(
                resolveUIPath(componentName, `${componentName}.stories.tsx`),
                storyTemplate(layer, componentName),
            );
            // ? Создание файла стилей компонента с использованием шаблона;
            await fs.writeFile(
                resolveUIPath(componentName, `${componentName}.module.scss`),
                styleTemplate(componentName),
            );
        } catch (e) {
            console.log('Не удалось создать компонент');
        }
    };

    // ? Асинхронное выполнение создания директории и компонента;
    await createUIDir();
    await createComponent();
};
