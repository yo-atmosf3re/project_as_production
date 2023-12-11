import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleRecommenadtionsList } from './ArticleRecommenadtionsList';

export default {
    title: 'features/ArticleRecommenadtionsList',
    component: ArticleRecommenadtionsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleRecommenadtionsList>;

const Template: ComponentStory<typeof ArticleRecommenadtionsList> = (args) => <ArticleRecommenadtionsList {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
