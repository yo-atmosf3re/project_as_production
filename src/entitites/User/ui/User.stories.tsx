import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { THEME } from 'app/providers/ThemeProvider';
import { User } from './User';

export default {
    title: 'entitites/User',
    component: User,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof User>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof User> = (args) => <User {...args} />;

export const Light = Template.bind({});
Light.args = {

};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(THEME.DARK)];
