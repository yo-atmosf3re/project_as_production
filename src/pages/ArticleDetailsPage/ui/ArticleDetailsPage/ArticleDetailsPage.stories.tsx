import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import ArticleDetailsPage from './ArticleDetailsPage';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'pages/ArticleDetailsPage/ArticleDetailsPage',
    component: ArticleDetailsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsPage>;

const Template: ComponentStory<typeof ArticleDetailsPage> = (args) => (
    <ArticleDetailsPage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({})];

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = {};
PrimaryRedesigned.decorators = [StoreDecorator({}), NewDesignDecorator];
