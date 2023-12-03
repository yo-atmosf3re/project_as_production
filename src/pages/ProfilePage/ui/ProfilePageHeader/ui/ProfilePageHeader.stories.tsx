import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ProfilePageHeader } from './ProfilePageHeader';

export default {
    title: 'pages/Profile/ProfilePageHeader',
    component: ProfilePageHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePageHeader>;

const Template: ComponentStory<typeof ProfilePageHeader> = (args) => <ProfilePageHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
Primary.decorators = [StoreDecorator({
    profile: {
        // isLoading: false,
    },
})];
