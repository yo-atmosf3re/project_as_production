import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { EditableProfilePageHeader } from './EditableProfilePageHeader';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/EditableProfileCard/EditableProfilePageHeader',
    component: EditableProfilePageHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EditableProfilePageHeader>;

const Template: ComponentStory<typeof EditableProfilePageHeader> = (args) => (
    <EditableProfilePageHeader {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
    StoreDecorator({
        profile: {},
    }),
];

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = {};
PrimaryRedesigned.decorators = [
    StoreDecorator({
        profile: {},
    }),
    NewDesignDecorator,
];
