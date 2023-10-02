import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { THEME } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { LoginModal } from './LoginModal';

export default {
    title: 'features/LoginModal',
    component: LoginModal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LoginModal>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof LoginModal> = (args) => <LoginModal {...args} />;

export const Light = Template.bind({});
Light.args = {
    isOpen: true,
};

export const Dark = Template.bind({});
Dark.args = {
    isOpen: true,
};
Dark.decorators = [ThemeDecorator(THEME.DARK)];
