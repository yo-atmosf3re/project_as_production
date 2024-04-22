import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../../../../Button';
import { Dropdown } from './Dropdown';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/Popups/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
    <Dropdown {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    trigger: <Button>Open!</Button>,
    items: [
        {
            content: 'first',
        },
        {
            content: 'second',
        },
        {
            content: 'third',
        },
    ],
};
