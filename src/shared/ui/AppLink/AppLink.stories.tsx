import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { THEME } from 'app/providers/ThemeProvider';
import { AppLink, AppLinkTheme } from './AppLink';

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

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'App link',
    theme: AppLinkTheme.PRIMARY,
};

export const Secondary = Template.bind({});
Secondary.args = {
    children: 'App link',
    theme: AppLinkTheme.SECONDARY,
};
Secondary.decorators = [ThemeDecorator(THEME.DARK)];

export const Red = Template.bind({});
Red.args = {
    children: 'Red link',
    theme: AppLinkTheme.RED,
};

export const RedDark = Template.bind({});
RedDark.args = {
    children: 'Red link',
    theme: AppLinkTheme.RED,
};
RedDark.decorators = [ThemeDecorator(THEME.DARK)];
