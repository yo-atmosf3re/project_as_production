import { Node, Project, SyntaxKind } from 'ts-morph';

export {};

// ? Создаём инстанс на основании импортированного основного класс Project;
const project = new Project({});

// ? Файлы с исходным кодом, с которыми будет произведена работа, для того, чтобы ts-morph мог рекурсивно по этим файлам проходиться (для работы с этими файлами как с обычными объектами);
// project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/ArticleDetailsPage.ts');
// project.addSourceFilesAtPaths('src/**/*.tsx');

// ? Получение всех ts-файлов;
const files = project.getSourceFiles();

function isToggleFunction(node: Node) {
    
    let isToggleFeatures = false;

    node.forEachChild((child) => {
        if(child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') {
            isToggleFeatures = true;
        }
    })

    return isToggleFeatures;
}

// ? Итерируемся по каждому файлу с помощью цикла;
files.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        console.log(!!(node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)));
        if(node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);

            if(!objectOptions) return;

            const offFunctionProperty = objectOptions.getProperty('off');
            const onFunctionProperty = objectOptions.getProperty('on');
            const featureNameProperty = objectOptions.getProperty('name');

            const onFunction = onFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
            const offFunction = offFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
            const featureName = featureNameProperty?.getFirstDescendantByKindOrThrow(SyntaxKind.StringLiteral)
                .getText().slice(1, -1);

            console.log(onFunction?.getText());
            console.log(featureName?.getText());
        }
    })
});

// ? После выполнения всех алгоритмов с помощью ts-morph нужно обязательно использовать метод save для сохранения и применения всех изменений к файлам;
project.save();