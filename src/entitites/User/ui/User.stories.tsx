import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { User } from './User';

export default {
    title: 'shared/User',
    component: User,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof User>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof User> = (args) => <User {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
