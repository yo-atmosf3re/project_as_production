import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleDetailsComments } from './ArticleDetailsComments';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'pages/ArticleDetailsPage/ArticleDetailsComments',
    component: ArticleDetailsComments,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsComments>;

const Template: ComponentStory<typeof ArticleDetailsComments> = (args) => (
    <ArticleDetailsComments {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    id: '1',
};
Primary.decorators = [StoreDecorator({})];

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = {
    id: '1',
};
PrimaryRedesigned.decorators = [StoreDecorator({}), NewDesignDecorator];
