/* eslint-disable @typescript-eslint/no-var-requires */

// ? Импорт модулей Node.js для работы с файловой системой и путями;
const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const firstCharUpperCase = require('../firstCharUpperCase');

// ? Экспорт асинхронной функции, которая создает файл публичного API для нового Redux-слайса;

// ? Пример использования:
// ? await module.exports('features', 'mySlice');
// ? Результат: создание файла публичного API для нового Redux-слайса в слое 'features';
module.exports = async (layer, sliceName) => {
    // ? Генерация имен компонента и схемы;
    const componentName = firstCharUpperCase(sliceName);
    const schemaName = `${sliceName}Schema`;

    try {
        // ? Запись экспортов в файл index.ts слайса;
        await fs.writeFile(
            resolveRoot('src', layer, sliceName, 'index.ts'),
            `export { ${componentName} } from './ui/${componentName}/${componentName}';
export { ${firstCharUpperCase(schemaName)} } from './model/types/${schemaName}';
`,
        );
    } catch (e) {
        console.log('Не удалось создать PUBLIC API');
    }
};
