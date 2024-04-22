import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/Skeleton',
    component: Skeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [NewDesignDecorator],
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
