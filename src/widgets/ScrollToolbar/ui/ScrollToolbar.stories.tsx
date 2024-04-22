import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ScrollToolbar } from './ScrollToolbar';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'widgets/ScrollToolbar',
    component: ScrollToolbar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [NewDesignDecorator],
} as ComponentMeta<typeof ScrollToolbar>;

const Template: ComponentStory<typeof ScrollToolbar> = (args) => (
    <ScrollToolbar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
