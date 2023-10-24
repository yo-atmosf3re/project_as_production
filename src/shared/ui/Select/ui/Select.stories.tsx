import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '../../../config/storybook/ThemeDecorator/ThemeDecorator';
import { THEME } from 'app/providers/ThemeProvider';
import { Select } from './Select';

export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Light = Template.bind({});
Light.args = {
    label: 'Укажите значение',
    options: [
        { value: '1', content: 'Первый пункт' },
        { value: '2', content: 'Второй пункт' },
    ],
};

export const Dark = Template.bind({});
Dark.args = {
    label: 'Укажите значение',
    options: [
        { value: '1', content: 'Первый пункт' },
        { value: '2', content: 'Второй пункт' },
    ],
};
Dark.decorators = [ThemeDecorator(THEME.DARK)];
