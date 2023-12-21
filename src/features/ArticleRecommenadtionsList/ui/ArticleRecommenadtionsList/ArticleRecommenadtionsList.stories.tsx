import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleRecommenadtionsList } from './ArticleRecommenadtionsList';

export default {
    title: 'features/ArticleRecommenadtionsList',
    component: ArticleRecommenadtionsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleRecommenadtionsList>;

const Template: ComponentStory<typeof ArticleRecommenadtionsList> = (args) => <ArticleRecommenadtionsList {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
Primary.decorators = [
    StoreDecorator({
        articleDetailsPage: {
            recommendations: {
                // ! Когда-нибудь доделать это;
            },
        },
    }),
];
