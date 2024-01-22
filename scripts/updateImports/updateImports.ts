import { Project } from 'ts-morph';

export {};

// ? Создаём инстанс на основании импортированного основного класс Project;
const project = new Project({});

// ? Файлы с исходным кодом, с которыми будет произведена работа, для того, чтобы ts-morph мог рекурсивно по этим файлам проходиться (для работы с этими файлами как с обычными объектами);
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// ? Получение всех ts-файлов;
const files = project.getSourceFiles();

// ? Массив с названиями слоёв;
const LAYERS = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];

// ? Функция, которая проверяет правильность импорта (он должен быть не из библиотеки и абсолютным);
function isAbsolute(value: string) {
    // ? Возвращает true, если layer совпадает с value, так же это значит ещё то, что путь является абсолютным;
    return LAYERS.some((layer) => value.startsWith(layer));
}

// ? Итерируемся по каждому файлу с помощью цикла;
files.forEach((sourceFile) => {
    // ? Работа с AST-нодой ImportDeclaration;
    const importDeclarations = sourceFile.getImportDeclarations();
    // ? Итерация по всем нодам ImportDeclaration (их может быть много) для конкретного файла;
    importDeclarations.forEach((importDeclaration) => {
        // ? Взятие нужных данных из конкретной ноды, а именно - конкретный импорт, сама строка. Переменная value это то, куда нужно добавлять нужный алиас;
        const value = importDeclaration.getModuleSpecifierValue();

        // ? Если функция-хедпер вернула true с переданной нодой, то для этой ноды меняем импорт - в начало устанавливается "@/" и конкатинируется остаток value;
        if (isAbsolute(value)) {
            importDeclaration.setModuleSpecifier(`@/${value}`);
        }
    });
});

// ? После выполнения всех алгоритмов с помощью ts-morph нужно обязательно использовать метод save для сохранения и применения всех изменений к файлам;
project.save();
