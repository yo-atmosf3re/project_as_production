/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

// ? Пример использования:
// ? const resultPath = module.exports('первый_сегмент', 'второй_сегмент', 'третий_сегмент');
// ? Результат: абсолютный путь, объединяющий текущее расположение файла и переданные сегменты пути;
module.exports = (...segments) => path.resolve(__dirname, '..', '..', ...segments);
