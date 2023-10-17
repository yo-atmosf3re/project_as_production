import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProfilePageHeader } from './ProfilePageHeader';

export default {
    title: 'shared/ProfilePageHeader',
    component: ProfilePageHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePageHeader>;

const Template: ComponentStory<typeof ProfilePageHeader> = (args) => <ProfilePageHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
