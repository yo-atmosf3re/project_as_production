import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MyPopover as Popover } from './Popover';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/Popups/Popover',
    component: Popover,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
    <Popover {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
