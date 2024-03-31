import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { THEME } from '@/shared/const/consts';
import { ThemeDecorator } from '../../../../../../config/storybook/ThemeDecorator/ThemeDecorator';
import { ListBox } from './ListBox';

export default {
    title: 'shared/ListBox',
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
    ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
    <ListBox {...args} />
);

export const Light = Template.bind({});
Light.args = {
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

export const LightTopRight = Template.bind({});
LightTopRight.args = {
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

export const LightTopLeft = Template.bind({});
LightTopLeft.args = {
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

export const Dark = Template.bind({});
Dark.args = {
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
Dark.decorators = [ThemeDecorator(THEME.DARK)];

export const DarkBottomRight = Template.bind({});
DarkBottomRight.args = {
    direction: 'bottom right',
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
DarkBottomRight.decorators = [ThemeDecorator(THEME.DARK)];

export const DarkBottomLeft = Template.bind({});
DarkBottomLeft.args = {
    direction: 'bottom left',
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
DarkBottomLeft.decorators = [ThemeDecorator(THEME.DARK)];

export const DarkReadonly = Template.bind({});
DarkReadonly.args = {
    readonly: true,
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
DarkReadonly.decorators = [ThemeDecorator(THEME.DARK)];

export const Jungle = Template.bind({});
Jungle.args = {
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
Jungle.decorators = [ThemeDecorator(THEME.JUNGLE)];
