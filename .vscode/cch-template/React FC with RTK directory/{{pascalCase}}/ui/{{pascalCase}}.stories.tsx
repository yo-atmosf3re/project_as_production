import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { {{pascalCase}} } from './{{pascalCase}}';

export default {
    title: 'shared/{{pascalCase}}',
    component: {{pascalCase}},
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof {{pascalCase}}>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof {{ pascalCase }}> = (args) => <{{ pascalCase }} { ...args } />;

export const Primary = Template.bind({});
Primary.args = {

};
