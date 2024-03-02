import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import LoginForm from './LoginForm';

export default {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => (
    <LoginForm {...args} />
);

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [
    StoreDecorator({
        loginForm: {
            error: 'Some error',
        },
    }),
];

// export const Okay = Template.bind({});
// Okay.args = {};
// Okay.decorators = [StoreDecorator({
//     loginForm: {
//         username: '1',
//         password: '1',
//     },
// })];

// export const Loading = Template.bind({});
// Loading.args = {};
// Loading.decorators = [StoreDecorator({
//     loginForm: {
//         isLoading: true,
//     },
// })];
