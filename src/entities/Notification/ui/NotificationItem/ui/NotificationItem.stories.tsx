import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NotificationItem } from './NotificationItem';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Notification/NotificationItem',
    component: NotificationItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => (
            <div style={{ padding: 100 }}>
                <Story />
            </div>
        ),
    ],
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => (
    <NotificationItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    item: {
        id: '1',
        title: 'Какое-то название для элемента со списком уведомлений',
        description: 'Какое-то описание',
        href: 'https://www.google.com/',
    },
};

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = {
    item: {
        id: '1',
        title: 'Какое-то название для элемента со списком уведомлений',
        description: 'Какое-то описание',
        href: 'https://www.google.com/',
    },
};
PrimaryRedesigned.decorators = [NewDesignDecorator];
