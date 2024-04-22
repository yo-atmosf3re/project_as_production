import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleFilters } from './ArticleFilters';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'widgets/ArticleFilters',
    component: ArticleFilters,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [NewDesignDecorator],
} as ComponentMeta<typeof ArticleFilters>;

const Template: ComponentStory<typeof ArticleFilters> = (args) => (
    <ArticleFilters {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
