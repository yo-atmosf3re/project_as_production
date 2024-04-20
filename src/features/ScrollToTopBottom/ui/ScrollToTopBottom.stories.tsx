import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ScrollToTopBottom } from './ScrollToTopBottom';

export default {
    title: 'shared/ScrollToTopBottom',
    component: ScrollToTopBottom,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ScrollToTopBottom>;

const Template: ComponentStory<typeof ScrollToTopBottom> = (args) => <ScrollToTopBottom {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
