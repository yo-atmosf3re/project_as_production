import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListBox } from './ListBox';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/Popups/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    // ? Изменяем отступы с помощью декоратора;
    decorators: [
        (Story) => (
            <div style={{ padding: 100 }}>
                <Story />
            </div>
        ),
        NewDesignDecorator,
    ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
    <ListBox {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    defaultValue: 'Num',
    items: [
        {
            content: '1111111111111111111111',
            value: '1111111111111111111111',
        },
        {
            content: '222',
            value: '222',
        },
        {
            content: '333',
            value: '333',
        },
    ],
    label: 'Select current value',
};

export const PrimaryTopRight = Template.bind({});
PrimaryTopRight.args = {
    direction: 'top right',
    defaultValue: 'Num',
    items: [
        {
            content: '1111111111111111111111',
            value: '1111111111111111111111',
        },
        {
            content: '222',
            value: '222',
        },
        {
            content: '333',
            value: '333',
        },
    ],
    label: 'Select current value',
};

export const PrimaryTopLeft = Template.bind({});
PrimaryTopLeft.args = {
    direction: 'top left',
    defaultValue: 'Num',
    items: [
        {
            content: '1111111111111111111111',
            value: '1111111111111111111111',
        },
        {
            content: '222',
            value: '222',
        },
        {
            content: '333',
            value: '333',
        },
    ],
    label: 'Select current value',
};
