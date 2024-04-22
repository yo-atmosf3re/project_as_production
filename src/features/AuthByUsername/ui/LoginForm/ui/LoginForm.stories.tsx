import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import LoginForm from './LoginForm';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

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

export const ErrorRedeigned = Template.bind({});
ErrorRedeigned.args = {};
ErrorRedeigned.decorators = [
    StoreDecorator({
        loginForm: {
            error: 'Some error',
        },
    }),
    NewDesignDecorator,
];
