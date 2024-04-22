import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { THEME } from '@/shared/const/consts';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ThemeSwitcher } from './ThemeSwitcher';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/ThemeSwitcher',
    component: ThemeSwitcher,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ThemeSwitcher>;

const Template: ComponentStory<typeof ThemeSwitcher> = (args) => (
    <ThemeSwitcher {...args} />
);

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})];

export const LightRedesigned = Template.bind({});
LightRedesigned.args = {};
LightRedesigned.decorators = [StoreDecorator({}), NewDesignDecorator];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(THEME.DARK), StoreDecorator({})];
