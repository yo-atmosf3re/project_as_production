import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Drawer } from './Drawer';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/Drawer',
    component: Drawer,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
