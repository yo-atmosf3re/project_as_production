import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ErrorPage } from './ErrorPage';

export default {
    title: 'widget/ErrorPage',
    component: ErrorPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ErrorPage>;

const Template: ComponentStory<typeof ErrorPage> = (args) => <ErrorPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
