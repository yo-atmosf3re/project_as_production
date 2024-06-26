import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { THEME, CURRENCY } from '@/shared/const/consts';
import { COUNTRY } from '@/entities/Country';
import ProfilePage from './ProfilePage';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'pages/ProfilePage/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => (
    <ProfilePage {...args} />
);

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
    StoreDecorator({
        profile: {
            form: {
                username: 'Stories',
                age: 28,
                country: COUNTRY.ARMENIA,
                lastname: 'yo atmo',
                first: '1',
                city: '2',
                currency: CURRENCY.RUB,
            },
        },
    }),
];

export const LightRedesigned = Template.bind({});
LightRedesigned.args = {};
LightRedesigned.decorators = [
    StoreDecorator({
        profile: {
            form: {
                username: 'Stories',
                age: 28,
                country: COUNTRY.ARMENIA,
                lastname: 'yo atmo',
                first: '1',
                city: '2',
                currency: CURRENCY.RUB,
            },
        },
    }),
    NewDesignDecorator,
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
    StoreDecorator({
        profile: {
            form: {
                username: 'Stories',
                age: 28,
                country: COUNTRY.ARMENIA,
                lastname: 'yo atmo',
                first: '1',
                city: '2',
                currency: CURRENCY.RUB,
            },
        },
    }),
    ThemeDecorator(THEME.DARK),
];
