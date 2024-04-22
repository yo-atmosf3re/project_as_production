import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MyPopover as Popover } from './Popover';

export default {
    title: 'shared/deprecated/Popover',
    component: Popover,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
    <Popover {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
