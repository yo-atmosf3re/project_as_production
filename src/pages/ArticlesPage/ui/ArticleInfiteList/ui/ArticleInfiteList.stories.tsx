import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleInfiteList } from './ArticleInfiteList';

export default {
    title: 'shared/ArticleInfiteList',
    component: ArticleInfiteList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleInfiteList>;

const Template: ComponentStory<typeof ArticleInfiteList> = (args) => <ArticleInfiteList {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
