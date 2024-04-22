import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StarRating } from './StarRating';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/deprecated/StarRating',
    component: StarRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof StarRating>;

const Template: ComponentStory<typeof StarRating> = (args) => (
    <StarRating {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    size: 50,
};

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = {
    size: 50,
};
PrimaryRedesigned.decorators = [NewDesignDecorator];
