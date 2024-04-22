import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AppLogo } from './AppLogo';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/AppLogo',
    component: AppLogo,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [NewDesignDecorator],
} as ComponentMeta<typeof AppLogo>;

const Template: ComponentStory<typeof AppLogo> = (args) => (
    <AppLogo {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
