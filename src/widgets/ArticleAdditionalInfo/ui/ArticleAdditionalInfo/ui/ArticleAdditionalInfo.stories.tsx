import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleAdditionalInfo } from './ArticleAdditionalInfo';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'widgets/ArticleAdditionalInfo',
    component: ArticleAdditionalInfo,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [NewDesignDecorator],
} as ComponentMeta<typeof ArticleAdditionalInfo>;

const Template: ComponentStory<typeof ArticleAdditionalInfo> = (args) => (
    <ArticleAdditionalInfo {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
