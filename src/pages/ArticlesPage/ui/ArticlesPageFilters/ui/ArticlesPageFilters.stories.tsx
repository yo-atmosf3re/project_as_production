import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticlesPageFilters } from './ArticlesPageFilters';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'pages/ArticlesPage/ArticlesPageFilters',
    component: ArticlesPageFilters,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ArticlesPageFilters>;

const Template: ComponentStory<typeof ArticlesPageFilters> = (args) => (
    <ArticlesPageFilters {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = {};
PrimaryRedesigned.decorators = [NewDesignDecorator];
