// ? Экспорт функции, которая принимает имя компонента и возвращает строку с SCSS-правилами для данного компонента;

// ? Пример использования:
// ? const result = module.exports('myComponent');
// ? Результат: '.myComponent {\n}', где создается селектор для компонента в формате SCSS;

module.exports = (componentName) => `.${componentName} {

}
`;
