import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import withMock from 'storybook-addon-mock';
import { ArticleI } from 'entities/Article';
import { ArticleRecommenadtionsList } from './ArticleRecommenadtionsList';

export default {
    title: 'features/ArticleRecommenadtionsList',
    component: ArticleRecommenadtionsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        withMock,
    ],
} as ComponentMeta<typeof ArticleRecommenadtionsList>;

const Template: ComponentStory<typeof ArticleRecommenadtionsList> = (args) => <ArticleRecommenadtionsList {...args} />;

const article: ArticleI = {
    id: '1',
    img: '',
    createdAt: '',
    views: 123,
    user: {
        id: '1',
        username: '123',
    },
    blocks: [],
    type: [],
    title: '123',
    subtitle: 'asfsa',
};

export const Primary = Template.bind({});
Primary.args = {

};
Primary.decorators = [
    StoreDecorator({

    }),
];

// ? С помощью стороннего аддона мокаем запрос на сервер за данными, это нужно для того, чтобы можно было создавать сторисы, которые внутри себя будут использоваться RTK Query;
Primary.parameters = {
    mockData: [
        {
            // ! По какой-то причине конструкция `${__API__}/articles?_limit=3` не даёт желаемого результата и запрос не мокается, поэтому ниже используется полное название адреса;
            url: 'http://localhost:7777/articles?_limit=3',
            method: 'GET',
            status: 200,
            response: [
                { ...article, id: '1' },
                { ...article, id: '2' },
                { ...article, id: '3' },
            ],
        },
    ],
};
