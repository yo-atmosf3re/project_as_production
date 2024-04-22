import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import {
    THEME,
    ARTICLE_BLOCK_TYPE,
    ARTICLE_TYPE,
    ARTICLE_VIEW,
} from '@/shared/const/consts';

import { ArticleI } from '../../../model/types/article';
import { ArticleList } from './ArticleList';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Article/ArticleList',
    component: ArticleList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleList>;

const article = {
    id: '1',
    title: 'JavaScript news JavaScript news JavaScript news',
    subtitle: 'Что нового за JS за 2023 год?',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    views: 1022,
    createdAt: '11.11.2021',
    user: {
        id: '1',
        username: 'Alex',
        avatar: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    },
    type: [
        ARTICLE_TYPE.IT,
        ARTICLE_TYPE.ECONOMICS,
        ARTICLE_TYPE.SCIENCE,
        'POLITICS',
    ],
    blocks: [
        {
            id: '1',
            type: ARTICLE_BLOCK_TYPE.TEXT,
            title: 'Заголовок этого блока',
            paragraphs: [
                'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
                'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
            ],
        },
        {
            id: '4',
            type: ARTICLE_BLOCK_TYPE.CODE,
            code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
        },
        {
            id: '5',
            type: ARTICLE_BLOCK_TYPE.TEXT,
            title: 'Заголовок этого блока',
            paragraphs: [
                'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
            ],
        },
        {
            id: '2',
            type: ARTICLE_BLOCK_TYPE.IMAGE,
            src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
            title: 'Рисунок 1 - скриншот сайта',
        },
        {
            id: '3',
            type: ARTICLE_BLOCK_TYPE.CODE,
            code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
        },
        {
            id: '7',
            type: ARTICLE_BLOCK_TYPE.TEXT,
            title: 'Заголовок этого блока',
            paragraphs: [
                'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
                'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
            ],
        },
        {
            id: '8',
            type: ARTICLE_BLOCK_TYPE.IMAGE,
            src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
            title: 'Рисунок 1 - скриншот сайта',
        },
        {
            id: '9',
            type: ARTICLE_BLOCK_TYPE.TEXT,
            title: 'Заголовок этого блока',
            paragraphs: [
                'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
            ],
        },
    ],
} as ArticleI;

const Template: ComponentStory<typeof ArticleList> = (args) => (
    <ArticleList {...args} />
);

export const IsLoadingBig = Template.bind({});
IsLoadingBig.args = {
    isLoading: true,
    articles: [],
    view: ARTICLE_VIEW.BIG,
};

export const IsLoadingSmall = Template.bind({});
IsLoadingSmall.args = {
    isLoading: true,
    articles: [],
    view: ARTICLE_VIEW.SMALL,
};

export const Big = Template.bind({});
Big.args = {
    isLoading: false,
    articles: Array.from({ length: 6 }, (_, index) => ({
        ...article,
        id: String(index),
    })),
    view: ARTICLE_VIEW.BIG,
};

export const BigRedesigned = Template.bind({});
BigRedesigned.args = {
    isLoading: false,
    articles: Array.from({ length: 6 }, (_, index) => ({
        ...article,
        id: String(index),
    })),
    view: ARTICLE_VIEW.BIG,
};
BigRedesigned.decorators = [NewDesignDecorator];

export const Small = Template.bind({});
Small.args = {
    isLoading: false,
    articles: Array.from({ length: 6 }, (_, index) => ({
        ...article,
        id: String(index),
    })),
    view: ARTICLE_VIEW.SMALL,
};

export const SmallRedesigned = Template.bind({});
SmallRedesigned.args = {
    isLoading: false,
    articles: Array.from({ length: 6 }, (_, index) => ({
        ...article,
        id: String(index),
    })),
    view: ARTICLE_VIEW.SMALL,
};
SmallRedesigned.decorators = [NewDesignDecorator];

export const IsLoadingBigDark = Template.bind({});
IsLoadingBigDark.args = {
    isLoading: true,
    articles: [],
    view: ARTICLE_VIEW.BIG,
};
IsLoadingBigDark.decorators = [ThemeDecorator(THEME.DARK)];

export const IsLoadingSmallDark = Template.bind({});
IsLoadingSmallDark.args = {
    isLoading: true,
    articles: [],
    view: ARTICLE_VIEW.SMALL,
};
IsLoadingSmallDark.decorators = [ThemeDecorator(THEME.DARK)];

export const IsLoadingBigJungle = Template.bind({});
IsLoadingBigJungle.args = {
    isLoading: true,
    articles: [],
    view: ARTICLE_VIEW.BIG,
};
IsLoadingBigJungle.decorators = [ThemeDecorator(THEME.JUNGLE)];

export const IsLoadingSmallJungle = Template.bind({});
IsLoadingSmallJungle.args = {
    isLoading: true,
    articles: [],
    view: ARTICLE_VIEW.SMALL,
};
IsLoadingSmallJungle.decorators = [ThemeDecorator(THEME.JUNGLE)];
