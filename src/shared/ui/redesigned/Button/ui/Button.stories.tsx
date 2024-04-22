import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    variant: 'clear',
};

export const Outline = Template.bind({});
Outline.args = {
    children: 'Text',
    variant: 'outline',
};

export const OutlineSizeL = Template.bind({});
OutlineSizeL.args = {
    children: 'Text',
    variant: 'outline',
    size: 'l',
};

export const OutlineSizeXL = Template.bind({});
OutlineSizeXL.args = {
    children: 'Text',
    variant: 'outline',
    size: 'l',
};

export const OutlineSizeM = Template.bind({});
OutlineSizeM.args = {
    children: 'Text',
    variant: 'outline',
    size: 'm',
};

export const Background = Template.bind({});
Background.args = {
    children: 'Text',
    variant: 'filled',
};

export const SizeL = Template.bind({});
SizeL.args = {
    children: 'Text',
    variant: 'clear',
    size: 'l',
};

export const SizeXL = Template.bind({});
SizeXL.args = {
    children: 'Text',
    variant: 'clear',
    size: 'xl',
};

export const SizeM = Template.bind({});
SizeM.args = {
    children: 'Text',
    variant: 'clear',
    size: 'm',
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: '>',
    variant: 'filled',
    size: 'l',
    disabled: true,
};
