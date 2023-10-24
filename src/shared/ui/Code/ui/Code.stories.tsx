import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { THEME } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from '../../../config/storybook/ThemeDecorator/ThemeDecorator';
import { Code } from './Code';

export default {
    title: 'shared/Code',
    component: Code,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Light = Template.bind({});
Light.args = {
    text: `export default {
    title: 'shared/Code',
    component: Code,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Light = Template.bind({});`,
};

export const Dark = Template.bind({});
Dark.args = {
    text: `export default {
    title: 'shared/Code',
    component: Code,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Dark = Template.bind({});`,
};
Dark.decorators = [
    ThemeDecorator(THEME.DARK),
];

export const Jungle = Template.bind({});
Jungle.args = {
    text: `export default {
    title: 'shared/Code',
    component: Code,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Jungle = Template.bind({});`,
};
