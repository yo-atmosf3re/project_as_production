import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AddCommentForm } from '../index';

export default {
    title: 'shared/AddCommentForm',
    component: AddCommentForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AddCommentForm>;

const Template: ComponentStory<typeof AddCommentForm> = (args) => <AddCommentForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
