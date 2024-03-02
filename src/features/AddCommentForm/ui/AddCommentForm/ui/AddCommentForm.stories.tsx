import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { THEME } from '@/shared/const/consts';
import { AddCommentForm } from '../index';

export default {
    title: 'features/AddCommentForm',
    component: AddCommentForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AddCommentForm>;

const Template: ComponentStory<typeof AddCommentForm> = (args) => (
    <AddCommentForm {...args} />
);

export const Light = Template.bind({});
Light.args = {
    onSendComment: action('onSendComment'),
};
Light.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {
    onSendComment: action('onSendComment'),
};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(THEME.DARK)];

export const Jungle = Template.bind({});
Jungle.args = {
    onSendComment: action('onSendComment'),
};
Jungle.decorators = [StoreDecorator({}), ThemeDecorator(THEME.JUNGLE)];
