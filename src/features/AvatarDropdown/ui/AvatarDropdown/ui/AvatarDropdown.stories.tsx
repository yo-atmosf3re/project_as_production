import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AvatarDropdown } from './AvatarDropdown';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import AvatarTest from '@/shared/assets/tests/avatar_image_for_test.jpg';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/AvatarDropdown',
    component: AvatarDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => (
    <AvatarDropdown {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
    StoreDecorator({
        user: {
            authData: {
                avatar: AvatarTest,
            },
        },
    }),
];

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = {};
PrimaryRedesigned.decorators = [
    StoreDecorator({
        user: {
            authData: {
                avatar: AvatarTest,
            },
        },
    }),
    NewDesignDecorator,
];
