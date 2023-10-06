import React from 'react';
import { ComponentStory, ComponentMeta, storiesOf } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { THEME } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { LoginForm } from './LoginForm';

export default {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta < typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [StoreDecorator({
    loginForm: {
        error: 'Some error',
    },
})];

export const Okay = Template.bind({});
Okay.args = {};
Okay.decorators = [StoreDecorator({
    loginForm: {
        username: '1',
        password: '1',
    },
})];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [StoreDecorator({
    loginForm: {
        isLoading: true,
    },
})];

storiesOf('features/LoginForm', module)
    .addParameters({
        argTypes: {
            backgroundColor: { control: 'color' },
        },
    })
    .addDecorator(ThemeDecorator(THEME.DARK))
    .addDecorator(StoreDecorator({
        loginForm: {
            username: '1',
            password: '1',
        },
    }))
    .add('Okay dark', () => <LoginForm />);

storiesOf('features/LoginForm', module)
    .addParameters({
        argTypes: {
            backgroundColor: { control: 'color' },
        },
    })
    .addDecorator(ThemeDecorator(THEME.DARK))
    .addDecorator(StoreDecorator({
        loginForm: {
            error: 'Some error',
        },
    }))
    .add('Error dark', () => <LoginForm />);

storiesOf('features/LoginForm', module)
    .addParameters({
        argTypes: {
            backgroundColor: { control: 'color' },
        },
    })
    .addDecorator(ThemeDecorator(THEME.DARK))
    .addDecorator(StoreDecorator({
        loginForm: {
            isLoading: true,
        },
    }))
    .add('Loading dark', () => <LoginForm />);
