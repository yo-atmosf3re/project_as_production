import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { COUNTRY } from '@/entities/Country';
import { CURRENCY } from '@/shared/const/consts';
import Avatar from '@/shared/assets/tests/avatar_image_for_test.jpg';
import { EditableProfileCard } from './EditableProfileCard';

export default {
    title: 'features/EditableProfileCard/EditableProfileCard',
    component: EditableProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EditableProfileCard>;

const Template: ComponentStory<typeof EditableProfileCard> = (args) => <EditableProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
Primary.decorators = [
    StoreDecorator({
        profile: {
            data: {
                age: 21,
                avatar: Avatar,
                city: 'Tokio',
                country: COUNTRY.RUSSIA,
                currency: CURRENCY.EUR,
                first: 'Jonny',
                id: '3',
                lastname: 'Jonson',
                username: 'Lalka228',
            },
        },
    }),
];
