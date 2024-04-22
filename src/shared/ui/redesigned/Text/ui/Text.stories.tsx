import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from './Text';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [NewDesignDecorator],
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

export const BothVariantsTextsPrimary = Template.bind({});
BothVariantsTextsPrimary.args = {
    text: 'Text',
    title: 'Title',
};

export const SomeTextError = Template.bind({});
SomeTextError.args = {
    text: 'Text',
    variant: 'error',
};

export const SomeTitleError = Template.bind({});
SomeTitleError.args = {
    title: 'Title',
    variant: 'error',
};
export const BothVariantsTextsError = Template.bind({});
BothVariantsTextsError.args = {
    text: 'Text',
    title: 'Title',
    variant: 'error',
};

export const SizeS = Template.bind({});
SizeS.args = {
    size: 's',
    text: 'Text',
    title: 'Title',
};

export const SizeM = Template.bind({});
SizeM.args = {
    size: 'm',
    text: 'Text',
    title: 'Title',
};

export const SizeL = Template.bind({});
SizeL.args = {
    size: 'l',
    text: 'Text',
    title: 'Title',
};
