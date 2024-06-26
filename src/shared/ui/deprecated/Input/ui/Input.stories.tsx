import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { THEME } from '@/shared/const/consts';
import { ThemeDecorator } from '../../../../config/storybook/ThemeDecorator/ThemeDecorator';
import { Input } from './Input';

export default {
    title: 'shared/deprecated/Input',
    component: Input,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Light = Template.bind({});
Light.args = {
    placeholder: 'Введите текст',
};

export const Dark = Template.bind({});
Dark.args = {
    placeholder: 'Введите текст',
};
Dark.decorators = [ThemeDecorator(THEME.DARK)];
