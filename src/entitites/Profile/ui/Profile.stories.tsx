import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Profile } from './Profile';

export default {
    title: 'shared/Profile',
    component: Profile,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Profile>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Profile> = (args) => <Profile {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
