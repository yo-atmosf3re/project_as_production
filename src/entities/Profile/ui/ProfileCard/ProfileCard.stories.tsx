import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { COUNTRY } from '@/entities/Country';
import { CURRENCY } from '@/shared/const/consts';
import AvatarForTest from '@/shared/assets/tests/avatar_image_for_test.jpg';
import { ProfileCard } from './ProfileCard';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    data: {
        username: 'Stories',
        age: 28,
        country: COUNTRY.ARMENIA,
        lastname: 'Ulbi TV',
        first: '1',
        city: '2',
        currency: CURRENCY.RUB,
        avatar: AvatarForTest,
    },
};

export const IsLoading = Template.bind({});
IsLoading.args = {
    isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
    error: 'true',
};
