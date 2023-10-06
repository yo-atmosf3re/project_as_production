import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { THEME } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { LoginForm } from './LoginForm';

// // ! Для того, чтобы подтягивались нужные темы вне контекста Storybook создана отдельная сторис с тёмной темой, потому то LoginForm вызывается и встраивается отдельно от блока с классом root;
// export default {
//     title: 'features/LoginDarkForm',
//     component: LoginForm,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
//     decorators: [
//         ThemeDecorator(THEME.DARK),
//     ],
// } as ComponentMeta < typeof LoginForm>;

// const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

// export const ErrorDark = Template.bind({});
// ErrorDark.args = {};
// ErrorDark.decorators = [StoreDecorator({
//     loginForm: {
//         error: 'Some error',
//     },
// })];

// export const OkayDark = Template.bind({});
// OkayDark.args = {};
// OkayDark.decorators = [StoreDecorator({
//     loginForm: {
//         username: '1',
//         password: '1',
//     },
// })];

// export const LoadingDark = Template.bind({});
// LoadingDark.args = {};
// LoadingDark.decorators = [StoreDecorator({
//     loginForm: {
//         isLoading: true,
//     },
// })];
