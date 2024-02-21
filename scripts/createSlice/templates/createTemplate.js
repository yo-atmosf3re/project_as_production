/* eslint-disable @typescript-eslint/no-var-requires */

// ? Импорт модулей Node.js для работы с файловой системой и путями;
const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const createModel = require('./createModel');
const createUI = require('./createUI');
const createPublicApi = require('./createPublicApi');

// ? Экспорт асинхронной функции, которая создает структуру файлов и директорий для нового Redux-слайса;

// ? Пример использования:
// ? await module.exports('features', 'mySlice');
// ? Результат: создание необходимых файлов и директорий для нового Redux-слайса в слое 'features';
module.exports = async (layer, sliceName) => {
    try {
        // ? Создание директории для нового слайса;
        await fs.mkdir(resolveRoot('src', layer, sliceName));
    } catch (e) {
        console.log(`не удалось создать директорию для слайса${sliceName}`);
    }

    // ? Асинхронное выполнение создания модели, UI и публичного API для слайса;
    await createModel(layer, sliceName);
    await createUI(layer, sliceName);
    await createPublicApi(layer, sliceName);
};
