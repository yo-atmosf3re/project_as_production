// ? Экспорт функции, которая генерирует шаблонный код для React-компонента;

// ? Пример использования:
// ? const result = module.exports('MyComponent');
// ? Результат: строка с шаблоном кода для компонента 'MyComponent';
const interfaceConst = 'interface';

module.exports = (componentName) => `import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './${componentName}.module.scss';

${interfaceConst} ${componentName}PropsI {
    className?: string;
}

export const ${componentName}: React.FC<${componentName}PropsI> = memo(({
    className,
}) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.${componentName}, {}, [className])}>
           ${componentName}
        </div>
    );
});

`;
