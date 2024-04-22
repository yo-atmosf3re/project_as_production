import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import ProfileRating from './ProfileRating';
import { THEME } from '@/shared/const/consts';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'features/ProfileRating',
    component: ProfileRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof ProfileRating>;

const Template: ComponentStory<typeof ProfileRating> = (args) => (
    <ProfileRating {...args} />
);

export const WithRate = Template.bind({});
WithRate.args = {
    profileId: '1',
};
WithRate.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '1',
            },
        },
    }),
];
WithRate.parameters = {
    mockData: [
        {
            // ! По какой-то причине конструкция `${__API__}/...` не даёт желаемого результата и запрос не мокается, поэтому ниже используется полное название адреса;
            url: 'http://localhost:7777/profile-ratings?profileId=1&userId=1',
            method: 'GET',
            status: 200,
            response: [
                {
                    rate: 4,
                },
            ],
        },
    ],
};

export const WithRateRedesigned = Template.bind({});
WithRateRedesigned.args = {
    profileId: '1',
};
WithRateRedesigned.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '1',
            },
        },
    }),
    NewDesignDecorator,
];
WithRateRedesigned.parameters = {
    mockData: [
        {
            // ! По какой-то причине конструкция `${__API__}/...` не даёт желаемого результата и запрос не мокается, поэтому ниже используется полное название адреса;
            url: 'http://localhost:7777/profile-ratings?profileId=1&userId=1',
            method: 'GET',
            status: 200,
            response: [
                {
                    rate: 4,
                },
            ],
        },
    ],
};

export const WithoutRate = Template.bind({});
WithoutRate.args = {
    profileId: '1',
};
WithoutRate.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '1',
            },
        },
    }),
];
WithoutRate.parameters = {
    mockData: [
        {
            // ! По какой-то причине конструкция `${__API__}/...` не даёт желаемого результата и запрос не мокается, поэтому ниже используется полное название адреса;
            url: 'http://localhost:7777/profile-ratings?profileId=1&userId=1',
            method: 'GET',
            status: 200,
            response: [],
        },
    ],
};

export const WithRateDark = Template.bind({});
WithRateDark.args = {
    profileId: '1',
};
WithRateDark.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '1',
            },
        },
    }),
    ThemeDecorator(THEME.DARK),
];
WithRateDark.parameters = {
    mockData: [
        {
            // ! По какой-то причине конструкция `${__API__}/...` не даёт желаемого результата и запрос не мокается, поэтому ниже используется полное название адреса;
            url: 'http://localhost:7777/profile-ratings?profileId=1&userId=1',
            method: 'GET',
            status: 200,
            response: [
                {
                    rate: 4,
                },
            ],
        },
    ],
};

export const WithoutRateDark = Template.bind({});
WithoutRateDark.args = {
    profileId: '1',
};
WithoutRateDark.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '1',
            },
        },
    }),
    ThemeDecorator(THEME.DARK),
];
WithoutRateDark.parameters = {
    mockData: [
        {
            // ! По какой-то причине конструкция `${__API__}/...` не даёт желаемого результата и запрос не мокается, поэтому ниже используется полное название адреса;
            url: 'http://localhost:7777/profile-ratings?profileId=1&userId=1',
            method: 'GET',
            status: 200,
            response: [],
        },
    ],
};

export const WithRateJungle = Template.bind({});
WithRateJungle.args = {
    profileId: '1',
};
WithRateJungle.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '1',
            },
        },
    }),
    ThemeDecorator(THEME.JUNGLE),
];
WithRateJungle.parameters = {
    mockData: [
        {
            // ! По какой-то причине конструкция `${__API__}/...` не даёт желаемого результата и запрос не мокается, поэтому ниже используется полное название адреса;
            url: 'http://localhost:7777/profile-ratings?profileId=1&userId=1',
            method: 'GET',
            status: 200,
            response: [
                {
                    rate: 4,
                },
            ],
        },
    ],
};

export const WithoutRateJungle = Template.bind({});
WithoutRateJungle.args = {
    profileId: '1',
};
WithoutRateJungle.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '1',
            },
        },
    }),
    ThemeDecorator(THEME.JUNGLE),
];
WithoutRateJungle.parameters = {
    mockData: [
        {
            // ! По какой-то причине конструкция `${__API__}/...` не даёт желаемого результата и запрос не мокается, поэтому ниже используется полное название адреса;
            url: 'http://localhost:7777/profile-ratings?profileId=1&userId=1',
            method: 'GET',
            status: 200,
            response: [],
        },
    ],
};
