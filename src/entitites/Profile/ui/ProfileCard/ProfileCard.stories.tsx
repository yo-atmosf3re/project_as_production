import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProfileCard } from './ProfileCard';

export default {
    title: 'shared/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
