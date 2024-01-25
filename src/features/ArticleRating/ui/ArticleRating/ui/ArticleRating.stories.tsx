import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import ArticleRating from './ArticleRating';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { THEME } from '@/app/providers/ThemeProvider';

export default {
    title: 'features/ArticleRating',
    component: ArticleRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        withMock,
    ],
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />;

export const WithRate = Template.bind({});
WithRate.args = {
    articleId: '1',
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
            url: 'http://localhost:7777/article-ratings?articleId=1&userId=1',
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
    articleId: '1',
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
            url: 'http://localhost:7777/article-ratings?articleId=1&userId=1',
            method: 'GET',
            status: 200,
            response: [
            ],
        },
    ],
};

export const WithRateDark = Template.bind({});
WithRateDark.args = {
    articleId: '1',
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
            url: 'http://localhost:7777/article-ratings?articleId=1&userId=1',
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
    articleId: '1',
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
            url: 'http://localhost:7777/article-ratings?articleId=1&userId=1',
            method: 'GET',
            status: 200,
            response: [
            ],
        },
    ],
};

export const WithRateJungle = Template.bind({});
WithRateJungle.args = {
    articleId: '1',
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
            url: 'http://localhost:7777/article-ratings?articleId=1&userId=1',
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
    articleId: '1',
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
            url: 'http://localhost:7777/article-ratings?articleId=1&userId=1',
            method: 'GET',
            status: 200,
            response: [
            ],
        },
    ],
};
