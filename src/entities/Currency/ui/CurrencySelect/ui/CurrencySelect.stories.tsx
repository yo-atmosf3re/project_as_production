import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CurrencySelect } from './CurrencySelect';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Currency/CurrencySelect',
    component: CurrencySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => (
            <div style={{ padding: 200 }}>
                <Story />
            </div>
        ),
    ],
} as ComponentMeta<typeof CurrencySelect>;

const Template: ComponentStory<typeof CurrencySelect> = (args) => (
    <CurrencySelect {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = {};
PrimaryRedesigned.decorators = [NewDesignDecorator];
