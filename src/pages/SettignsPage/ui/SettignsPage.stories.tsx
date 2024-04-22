import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SettignsPage from './SettignsPage';

export default {
    title: 'shared/SettignsPage',
    component: SettignsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SettignsPage>;

const Template: ComponentStory<typeof SettignsPage> = (args) => (
    <SettignsPage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
