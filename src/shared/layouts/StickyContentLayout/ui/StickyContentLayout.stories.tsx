import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StickyContentLayout } from './StickyContentLayout';

export default {
    title: 'shared/StickyContentLayout',
    component: StickyContentLayout,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof StickyContentLayout>;

const Template: ComponentStory<typeof StickyContentLayout> = (args) => <StickyContentLayout {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
