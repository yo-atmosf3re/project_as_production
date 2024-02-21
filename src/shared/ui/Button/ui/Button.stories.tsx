import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { THEME } from '@/shared/const/consts';
import { ThemeDecorator } from '../../../config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, BUTTON_THEME, BUTTON_SIZE } from './Button';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    theme: BUTTON_THEME.CLEAR,
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
    children: 'Text',
    theme: BUTTON_THEME.CLEAR_INVERTED,
};

export const Outline = Template.bind({});
Outline.args = {
    children: 'Text',
    theme: BUTTON_THEME.OUTLINE,
};

export const OutlineInverted = Template.bind({});
OutlineInverted.args = {
    children: 'Text',
    theme: BUTTON_THEME.OUTLINE_INVERTED,
};

export const OutlineSizeL = Template.bind({});
OutlineSizeL.args = {
    children: 'Text',
    theme: BUTTON_THEME.OUTLINE,
    size: BUTTON_SIZE.L,
};

export const OutlineSizeXL = Template.bind({});
OutlineSizeXL.args = {
    children: 'Text',
    theme: BUTTON_THEME.OUTLINE,
    size: BUTTON_SIZE.XL,
};

export const OutlineSizeM = Template.bind({});
OutlineSizeM.args = {
    children: 'Text',
    theme: BUTTON_THEME.OUTLINE,
    size: BUTTON_SIZE.M,
};

export const Background = Template.bind({});
Background.args = {
    children: 'Text',
    theme: BUTTON_THEME.BACKGROUND,
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
    children: 'Text',
    theme: BUTTON_THEME.BACKGROUND_INVERTED,
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    children: 'Text',
    theme: BUTTON_THEME.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(THEME.DARK)];

export const SizeL = Template.bind({});
SizeL.args = {
    children: 'Text',
    theme: BUTTON_THEME.BACKGROUND,
    size: BUTTON_SIZE.L,
};

export const SizeXL = Template.bind({});
SizeXL.args = {
    children: 'Text',
    theme: BUTTON_THEME.BACKGROUND,
    size: BUTTON_SIZE.XL,
};

export const SizeM = Template.bind({});
SizeM.args = {
    children: 'Text',
    theme: BUTTON_THEME.BACKGROUND,
    size: BUTTON_SIZE.M,
};

export const Square = Template.bind({});
Square.args = {
    children: '>',
    theme: BUTTON_THEME.BACKGROUND_INVERTED,
    square: true,
};

export const SquareSizeL = Template.bind({});
SquareSizeL.args = {
    children: '>',
    theme: BUTTON_THEME.BACKGROUND_INVERTED,
    square: true,
    size: BUTTON_SIZE.L,
};

export const SquareSizeM = Template.bind({});
SquareSizeM.args = {
    children: '>',
    theme: BUTTON_THEME.BACKGROUND_INVERTED,
    square: true,
    size: BUTTON_SIZE.M,
};

export const SquareSizeXL = Template.bind({});
SquareSizeXL.args = {
    children: '>',
    theme: BUTTON_THEME.BACKGROUND_INVERTED,
    square: true,
    size: BUTTON_SIZE.XL,
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: '>',
    theme: BUTTON_THEME.OUTLINE,
    size: BUTTON_SIZE.XL,
    disabled: true,
};

export const DisabledDark = Template.bind({});
DisabledDark.args = {
    children: '>',
    theme: BUTTON_THEME.OUTLINE,
    size: BUTTON_SIZE.XL,
    disabled: true,
};
DisabledDark.decorators = [ThemeDecorator(THEME.DARK)];
