import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { THEME } from '@/app/providers/ThemeProvider';
import { COUNTRY } from '@/entities/Country';
import { CURRENCY } from '@/shared/const/consts';
import ProfilePage from './ProfilePage';

export default {
    title: 'pages/ProfilePage/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({
    profile: {
        form: {
            username: 'Stories',
            age: 28,
            country: COUNTRY.ARMENIA,
            lastname: 'Ulbi TV',
            first: '1',
            city: '2',
            currency: CURRENCY.RUB,
        },
    },
})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({
    profile: {
        form: {
            username: 'Stories',
            age: 28,
            country: COUNTRY.ARMENIA,
            lastname: 'Ulbi TV',
            first: '1',
            city: '2',
            currency: CURRENCY.RUB,
        },
    },
}),
ThemeDecorator(THEME.DARK)];
