import { Project, SyntaxKind } from 'ts-morph';

export {};

// ? Создаём инстанс на основании импортированного основного класс Project;
const project = new Project({});

// ? Файлы с исходным кодом, с которыми будет произведена работа, для того, чтобы ts-morph мог рекурсивно по этим файлам проходиться (для работы с этими файлами как с обычными объектами);
// project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/ArticleDetailsPage.ts');
// project.addSourceFilesAtPaths('src/**/*.tsx');

// ? Получение всех ts-файлов;
const files = project.getSourceFiles();

// ? Итерируемся по каждому файлу с помощью цикла;
files.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        if(node.isKind(SyntaxKind.CallExpression)) {
            node.forEachChild((child) => {
                if(child.isKind(SyntaxKind.Identifier)) {
                    
                }
            })
        }
    })
});

// ? После выполнения всех алгоритмов с помощью ts-morph нужно обязательно использовать метод save для сохранения и применения всех изменений к файлам;
project.save();
