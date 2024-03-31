import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { THEME } from '@/shared/const/consts';
import { ThemeDecorator } from '../../../../config/storybook/ThemeDecorator/ThemeDecorator';
import { Skeleton } from './Skeleton';

export default {
    title: 'shared/Skeleton',
    component: Skeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
    <Skeleton {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    width: '100%',
    height: 200,
};

export const Circle = Template.bind({});
Circle.args = {
    border: '50%',
    height: 100,
    width: 100,
};

export const NormalDark = Template.bind({});
NormalDark.args = {
    width: '100%',
    height: 200,
};
NormalDark.decorators = [ThemeDecorator(THEME.DARK)];

export const CircleDark = Template.bind({});
CircleDark.args = {
    border: '50%',
    height: 100,
    width: 100,
};
CircleDark.decorators = [ThemeDecorator(THEME.DARK)];

export const NormalJungle = Template.bind({});
NormalJungle.args = {
    width: '100%',
    height: 200,
};
NormalJungle.decorators = [ThemeDecorator(THEME.JUNGLE)];

export const CircleJungle = Template.bind({});
CircleJungle.args = {
    border: '50%',
    height: 100,
    width: 100,
};
CircleJungle.decorators = [ThemeDecorator(THEME.JUNGLE)];
