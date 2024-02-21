import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { THEME } from '@/shared/const/consts';
import { ThemeDecorator } from '../../../config/storybook/ThemeDecorator/ThemeDecorator';
import { APP_LINK_THEME, AppLink } from './AppLink';

export default {
    title: 'shared/AppLink',
    component: AppLink,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'App link',
    theme: APP_LINK_THEME.PRIMARY,
};

export const Secondary = Template.bind({});
Secondary.args = {
    children: 'App link',
    theme: APP_LINK_THEME.SECONDARY,
};
Secondary.decorators = [ThemeDecorator(THEME.DARK)];

export const Red = Template.bind({});
Red.args = {
    children: 'Red link',
    theme: APP_LINK_THEME.RED,
};

export const RedDark = Template.bind({});
RedDark.args = {
    children: 'Red link',
    theme: APP_LINK_THEME.RED,
};
RedDark.decorators = [ThemeDecorator(THEME.DARK)];
