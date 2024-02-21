// ? Экспорт функции, которая генерирует код для сторибука (Storybook) для React-компонента;

// ? Функция принимает два аргумента - слой (layer) и имя компонента (componentName), и возвращает строку с кодом для инициализации сторибука для данного компонента;

// ? Пример использования:
// ? const result = module.exports('features', 'MyComponent');
// ? Результат: строка кода для сторибука, настроенного на компонент 'MyComponent' в слое 'features';

module.exports = (layer, componentName) => `import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ${componentName} } from './${componentName}';

export default {
    title: '${layer}/${componentName}',
    component: ${componentName},
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ${componentName}>;

const Template: ComponentStory<typeof ${componentName}> = (args) => <${componentName} {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
`;
