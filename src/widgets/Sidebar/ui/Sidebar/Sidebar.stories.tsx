import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { THEME } from '@/shared/const/consts';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Sidebar } from './Sidebar';

export default {
    title: 'widget/Sidebar',
    component: Sidebar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => (
    <Sidebar {...args} />
);

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
    StoreDecorator({
        user: {
            authData: {},
        },
    }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
    ThemeDecorator(THEME.DARK),
    StoreDecorator({
        user: {
            authData: {},
        },
    }),
];

export const NoAuth = Template.bind({});
NoAuth.args = {};
NoAuth.decorators = [
    ThemeDecorator(THEME.DARK),
    StoreDecorator({
        user: {
            authData: undefined,
        },
    }),
];
