import { Node, Project, SyntaxKind } from 'ts-morph';

// ? Получение значений аргументов командной строки;
const removedFeatureName = process.argv[2]; // ? Название фичи;
const featureState = process.argv[3]; // ? Включить/выключить фичу;

// ? Проверка наличия названия фичи;
if(!removedFeatureName) throw new Error('Укажите название фича-флага!')

// ? Проверка наличия состояния фичи (включено/выключено);
if(!featureState) throw new Error('Укажите состояние фичи - on/off!')

// ? Проверка корректности указанного состояния фичи (on/off);
if(featureState !== 'on' && featureState !== 'off') throw new Error('Укажите корректное состояние фичи - on или off!')

// ? Создаём инстанс на основании импортированного основного класс Project;
const project = new Project({});

// ? Файлы с исходным кодом, с которыми будет произведена работа, для того, чтобы ts-morph мог рекурсивно по этим файлам проходиться (для работы с этими файлами как с обычными объектами);
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// ? Получение всех ts-файлов;
const files = project.getSourceFiles();

function isToggleFunction(node: Node) {
    
    let isToggleFeatures = false;

    // ? Проверка, является ли функция функцией toggleFeatures;
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
        // ? Проверка, является ли узел вызовом функции и функцией toggleFeatures;
        if(node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);

            if(!objectOptions) return;

            // ? Получение свойств off, on и name из объектного литерала;
            const offFunctionProperty = objectOptions.getProperty('off');
            const onFunctionProperty = objectOptions.getProperty('on');
            const featureNameProperty = objectOptions.getProperty('name');

            // ? Получение тела функций on и off, а также названия фичи;
            const onFunction = onFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
            const offFunction = offFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
            const featureName = featureNameProperty?.getFirstDescendantByKindOrThrow(SyntaxKind.StringLiteral)
                ?.getText().slice(1, -1);

            // ? Если название фичи не совпадает с удаляемой - скипаем цикл;
            if(featureName !== removedFeatureName) return;

            // ? В случае включения фичи, заменить вызов toggleFeatures на тело функции on;
            if(featureState === 'on') {
                node.replaceWithText(onFunction?.getBody().getText() ?? '')
            }
            
            // ? В случае выключения фичи, заменить вызов toggleFeatures на тело функции off;
            if(featureState === 'off') {
                node.replaceWithText(offFunction?.getBody().getText() ?? '')
            }

        }
    })
});

// ? После выполнения всех алгоритмов с помощью ts-morph нужно обязательно использовать метод save для сохранения и применения всех изменений к файлам;
project.save();