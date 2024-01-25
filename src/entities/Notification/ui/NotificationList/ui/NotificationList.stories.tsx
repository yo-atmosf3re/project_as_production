import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import { NotificationList } from './NotificationList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { THEME } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export default {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => (
            <div
                style={{ padding: 100 }}
            >
                <Story />
            </div>
        ),
        withMock,
    ],
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const WithNotification = Template.bind({});
WithNotification.args = {

};
WithNotification.decorators = [
    StoreDecorator({

    }),
];
WithNotification.parameters = {
    mockData: [
        {
            // ! По какой-то причине конструкция `${__API__}/...` не даёт желаемого результата и запрос не мокается, поэтому ниже используется полное название адреса;
            url: 'http://localhost:7777/notifications',
            method: 'GET',
            status: 200,
            response: [
                {
                    id: '1',
                    title: 'Уведомление',
                    description: 'Какое-то описание',
                },
                {
                    id: '2',
                    title: 'Уведомление',
                    description: 'Какое-то описание',
                },
                {
                    id: '3',
                    title: 'Уведомление',
                    description: 'Какое-то описание',
                },
            ],
        },
    ],
};

export const WithNotificationDark = Template.bind({});
WithNotificationDark.args = {

};
WithNotificationDark.decorators = [
    StoreDecorator({

    }),
    ThemeDecorator(THEME.DARK)];
WithNotificationDark.parameters = {
    mockData: [
        {
            // ! По какой-то причине конструкция `${__API__}/...` не даёт желаемого результата и запрос не мокается, поэтому ниже используется полное название адреса;
            url: 'http://localhost:7777/notifications',
            method: 'GET',
            status: 200,
            response: [
                {
                    id: '1',
                    title: 'Уведомление',
                    description: 'Какое-то описание',
                },
                {
                    id: '2',
                    title: 'Уведомление',
                    description: 'Какое-то описание',
                },
            ],
        },
    ],
};

export const WithNotificationJungle = Template.bind({});
WithNotificationJungle.args = {

};
WithNotificationJungle.decorators = [
    StoreDecorator({

    }),
    ThemeDecorator(THEME.JUNGLE)];
WithNotificationJungle.parameters = {
    mockData: [
        {
            // ! По какой-то причине конструкция `${__API__}/...` не даёт желаемого результата и запрос не мокается, поэтому ниже используется полное название адреса;
            url: 'http://localhost:7777/notifications',
            method: 'GET',
            status: 200,
            response: [
                {
                    id: '1',
                    title: 'Уведомление',
                    description: 'Какое-то описание',
                },
            ],
        },
    ],
};

export const WithoutNotification = Template.bind({});
WithoutNotification.args = {

};
WithoutNotification.decorators = [StoreDecorator({

})];
WithoutNotification.parameters = {
    mockData: [
        {
            // ! По какой-то причине конструкция `${__API__}/...` не даёт желаемого результата и запрос не мокается, поэтому ниже используется полное название адреса;
            url: 'http://localhost:7777/notifications',
            method: 'GET',
            status: 200,
            response: [
            ],
        },
    ],
};
