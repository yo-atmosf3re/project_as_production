import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { COUNTRY } from '@/entities/Country';
import { CURRENCY, THEME } from '@/shared/const/consts';
import AvatarForTest from '@/shared/assets/tests/avatar_image_for_test.jpg';
import { ProfileCard } from './ProfileCard';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export default {
    title: 'entities/Profile/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ProfileCard> = (args) => (
    <ProfileCard {...args} />
);

const primaryArgs = {
    data: {
        username: 'Stories',
        age: 28,
        country: COUNTRY.ARMENIA,
        lastname: 'yo atmo',
        first: '1',
        city: '2',
        currency: CURRENCY.RUB,
        avatar: AvatarForTest,
    },
};

export const Primary = Template.bind({});
Primary.args = primaryArgs;

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = primaryArgs;
PrimaryRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(THEME.DARK)];

export const IsLoading = Template.bind({});
IsLoading.args = {
    isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
    error: 'true',
};
