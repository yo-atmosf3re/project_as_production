import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RatingCard } from './RatingCard';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Rating/RatingCard',
    component: RatingCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof RatingCard>;

const Template: ComponentStory<typeof RatingCard> = (args) => (
    <RatingCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = {};
PrimaryRedesigned.decorators = [NewDesignDecorator];
