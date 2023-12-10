// ? Экспорт функции, которая принимает строку и возвращает ее с первой заглавной буквой;

// ? Пример использования:
// ? const result = module.exports('someString');
// ? Результат: 'SomeString', где первая буква строки стала заглавной;
module.exports = (str) => str[0].toUpperCase() + str.slice(1);
