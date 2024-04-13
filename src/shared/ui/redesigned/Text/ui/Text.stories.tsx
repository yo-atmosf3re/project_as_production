import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { THEME } from '@/shared/const/consts';
import { ThemeDecorator } from '../../../../config/storybook/ThemeDecorator/ThemeDecorator';
import { TextSizeType, TextVariantType, Text } from './Text';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const SomeTextPrimary = Template.bind({});
SomeTextPrimary.args = {
    text: 'Text',
};

export const SomeTitlePrimary = Template.bind({});
SomeTitlePrimary.args = {
    title: 'Title',
};

export const SomeTextDarkPrimary = Template.bind({});
SomeTextDarkPrimary.args = {
    text: 'Text',
};
SomeTextDarkPrimary.decorators = [ThemeDecorator(THEME.DARK)];

export const SomeTitleDarkPrimary = Template.bind({});
SomeTitleDarkPrimary.args = {
    title: 'Title',
};
SomeTitleDarkPrimary.decorators = [ThemeDecorator(THEME.DARK)];

export const BothVariantsTextsPrimary = Template.bind({});
BothVariantsTextsPrimary.args = {
    text: 'Text',
    title: 'Title',
};

export const BothVariantsTextsDarkPrimary = Template.bind({});
BothVariantsTextsDarkPrimary.args = {
    text: 'Text',
    title: 'Title',
};
BothVariantsTextsDarkPrimary.decorators = [ThemeDecorator(THEME.DARK)];

export const SomeTextError = Template.bind({});
SomeTextError.args = {
    text: 'Text',
    variant: TextVariant.ERROR,
};

export const SomeTitleError = Template.bind({});
SomeTitleError.args = {
    title: 'Title',
    variant: TextVariant.ERROR,
};

export const SomeTextDarkError = Template.bind({});
SomeTextDarkError.args = {
    text: 'Text',
    variant: TextVariant.ERROR,
};
SomeTextDarkError.decorators = [ThemeDecorator(THEME.DARK)];

export const SomeTitleDarkError = Template.bind({});
SomeTitleDarkError.args = {
    title: 'Title',
    variant: TextVariant.ERROR,
};
SomeTitleDarkError.decorators = [ThemeDecorator(THEME.DARK)];

export const BothVariantsTextsError = Template.bind({});
BothVariantsTextsError.args = {
    text: 'Text',
    title: 'Title',
    variant: TextVariant.ERROR,
};

export const BothVariantsTextsDarkError = Template.bind({});
BothVariantsTextsDarkError.args = {
    text: 'Text',
    title: 'Title',
    variant: TextVariant.ERROR,
};
BothVariantsTextsDarkError.decorators = [ThemeDecorator(THEME.DARK)];

export const SizeS = Template.bind({});
SizeS.args = {
    size: TextSize.S,
    text: 'Text',
    title: 'Title',
};

export const SizeM = Template.bind({});
SizeM.args = {
    size: TextSize.M,
    text: 'Text',
    title: 'Title',
};

export const SizeL = Template.bind({});
SizeL.args = {
    size: TextSize.L,
    text: 'Text',
    title: 'Title',
};
