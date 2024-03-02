import { Project } from 'ts-morph';
import path from 'path';

// ? Создаём инстанс на основании импортированного основного класс Project;
const project = new Project({});

// ? Массив с названиями слоёв;
const LAYERS = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];

// ? Функция, которая проверяет правильность импорта (он должен быть не из библиотеки и абсолютным);
function isAbsolute(value: string) {
    // ? Возвращает true, если layer совпадает с value, так же это значит ещё то, что путь является абсолютным;
    return LAYERS.some((layer) => value.startsWith(layer));
}

// ? Файлы с исходным кодом, с которыми будет произведена работа, для того, чтобы ts-morph мог рекурсивно по этим файлам проходиться (для работы с этими файлами как с обычными объектами);
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// ? Получение всех ts-файлов;
const files = project.getSourceFiles();

const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');

// ? Получение самой папки, в которой хранится сам shared-компонент;
const sharedUiDirectory = project.getDirectory(uiPath);

// ? Получение папок с shared-компонентами в виде массива (Button, Card, Code и так далее);
const componentsDirs = sharedUiDirectory?.getDirectories();

// ? Итерируемся по каждой папке с компонентом с помощью цикла;
componentsDirs?.forEach((directory) => {
    // ? Путь до index.ts внутри папки с UI-компонентой shared-слоя;
    const indexFilePath = `${directory.getPath()}/index.ts`;
    // ? Получение самого index.ts по вышеуказанному пути;
    const indexFile = directory.getSourceFile(indexFilePath);

    // ? Если файла index.ts в папке с shared-компонентой UI нет, то отрабатывает следующий алгоритм по созданию такого файла с указанием следующего кода, который описан в переменной sourceCode;
    if (!indexFile) {
        // ? Содержимое нового файла index.ts;
        const sourceCode = `export * from './ui/${directory.getBaseName()}';\n`;
        // ? Создание самого файла index.ts;
        const file = directory.createSourceFile(
            // ? Путь, по которому нужно создать файл;
            indexFilePath,
            // ? Содержимое файла (сам код);
            sourceCode,
            // ? Дополнительные опции, передаваемые в метод;
            {
                // ? Разрешение о перезаписи существующего файла;
                overwrite: true,
            },
        );

        // ? В конце алгоритма вызывается метод save, который сохраняет выполненный результат и создаёт нужные файлы в операционной системе;
        file.save();
    }
});

// ? Итерируемся по каждому файлу с помощью цикла;
files.forEach((sourceFile) => {
    // ? Работа с AST-нодой ImportDeclaration;
    const importDeclarations = sourceFile.getImportDeclarations();
    // ? Итерация по всем нодам ImportDeclaration (их может быть много) для конкретного файла;
    importDeclarations.forEach((importDeclaration) => {
        // ? Взятие нужных данных из конкретной ноды, а именно - конкретный импорт, сама строка;
        const value = importDeclaration.getModuleSpecifierValue();

        // ? Удаление алиаса из импорта;
        const valueWithoutAlias = value.replace('@/', '');

        // ? Разделение полученного пути без алиаса на сегменты;
        const segments = valueWithoutAlias.split('/');

        // ? Проверка слоя на shared;
        const isSharedLayer = segments?.[0] === 'shared';
        // ? Проверка на слайс, он должен соответствовать ui;
        const isUiSlice = segments?.[1] === 'ui';

        // ? Проверка пути на относительность, на правильность слоя и слайса: при соблюдении всех условий выполняется следующий алгоритм;
        if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUiSlice) {
            // ? Разделение пути без алиаса на '/', затем удаление у пути конца (конец, который содержит адресацию к файлу не из Public API, а напрямую к файлу), а после соединение всего этого через '/';
            const result = valueWithoutAlias.split('/').slice(0, 3).join('/');

            // ? Передача результата;
            importDeclaration.setModuleSpecifier(`@/${result}`);
        }
    });
});

// ? После выполнения всех алгоритмов с помощью ts-morph нужно обязательно использовать метод save для сохранения и применения всех изменений к файлам;
project.save();
