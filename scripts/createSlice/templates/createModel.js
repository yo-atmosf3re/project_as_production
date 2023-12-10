/* eslint-disable @typescript-eslint/no-var-requires */

// ? Импорт модулей Node.js для работы с файловой системой и путями;
const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const reduxSliceTemplate = require('./reduxSliceTemplate');
const schemaTypeTemplate = require('./schemaTypeTemplate');

// ? Экспорт асинхронной функции, которая создает структуру файлов и директорий для новой модели Redux-слайса;

// ? Пример использования:
// ? await module.exports('features', 'mySlice');
// ? Результат: создание необходимых файлов и директорий для нового Redux-слайса в слое 'features';
module.exports = async (layer, sliceName) => {
    // ? Функция, возвращающая абсолютный путь к директории модели сегмента;
    const resolveModelPath = (...segments) => resolveRoot('src', layer, sliceName, 'model', ...segments);

    // ? Функция для создания структуры директорий модели;
    const createModelStructure = async () => {
        try {
            await fs.mkdir(resolveModelPath());
            await fs.mkdir(resolveModelPath('types'));
            await fs.mkdir(resolveModelPath('slices'));
            await fs.mkdir(resolveModelPath('selectors'));
            await fs.mkdir(resolveModelPath('services'));
        } catch (e) {
            console.log(`Не удалось создать model сегмент для слайса ${sliceName}`, e);
        }
    };

    // ? Функция для создания файла редакс-слайса;
    const createReduxSlice = async () => {
        try {
            await fs.writeFile(
                resolveModelPath('slices', `${sliceName}Slice.ts`),
                reduxSliceTemplate(sliceName),
            );
        } catch (e) {
            console.log('Не удалось создать редакс слайс', e);
        }
    };

    // ? Функция для создания файла типа схемы стейта;
    const createSchemaType = async () => {
        try {
            await fs.writeFile(
                resolveModelPath('types', `${sliceName}Schema.ts`),
                schemaTypeTemplate(sliceName),
            );
        } catch (e) {
            console.log('Не удалось создать тип схемы стейта', e);
        }
    };

    // ? Асинхронное выполнение создания структуры и файлов модели;
    await createModelStructure();
    await createReduxSlice();
    await createSchemaType();
};
