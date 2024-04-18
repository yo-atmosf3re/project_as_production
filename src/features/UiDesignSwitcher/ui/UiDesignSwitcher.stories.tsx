import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UiDesignSwitcher } from './UiDesignSwitcher';

export default {
    title: 'shared/UiDesignSwitcher',
    component: UiDesignSwitcher,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof UiDesignSwitcher>;

const Template: ComponentStory<typeof UiDesignSwitcher> = (args) => <UiDesignSwitcher {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
