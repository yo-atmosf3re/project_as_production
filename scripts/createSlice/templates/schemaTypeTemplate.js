/* eslint-disable @typescript-eslint/no-var-requires */

// Импорт функции firstCharUpperCase из модуля '../firstCharUpperCase';
const firstCharUpperCase = require('../firstCharUpperCase');

// ? Экспорт функции, которая генерирует строку с интерфейсом TypeScript для схемы с именем, начинающимся с заглавной буквы;

// ? Пример использования:
// ? const result = module.exports('mySlice');
// ? Результат: строка с интерфейсом для схемы 'MySlice';
module.exports = (sliceName) => `export interface ${firstCharUpperCase(sliceName)}Schema {

}
`;
