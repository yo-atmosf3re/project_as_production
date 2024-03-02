/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-namespace */
import { ArticleI } from '../../../src/entities/Article/model/types/article';

const defaultArticle = {
    title: 'JavaScript news 2021',
    subtitle: 'Что нового в JS за 2023 год?',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    views: 512,
    createdAt: '11.12.2021',
    userId: '1',
    type: ['IT'],
    blocks: [],
};

/**
 * Создание статьи для тест кейсов;
 * @param article - статья, которая может быть передана в команду, но если стаьтья не была передана, то используется статья по-умолчанию - `defaultArticle`;
 */
export const createArticle = (article?: ArticleI) => {
    return cy
        .request({
            method: 'POST',
            url: 'http://localhost:7777/articles',
            headers: {
                Authorization: 'asasf',
            },
            body: article ?? defaultArticle,
        })
        .then(
            // ? Возвращение конкретной статьи;
            (res) => res.body,
        );
};

/**
 * Удаление статьи для тест кейсов (исключение засорения базы данных);
 */
export const removeArticle = (articleId: string) => {
    return cy.request({
        method: 'DELETE',
        url: `http://localhost:7777/articles/${articleId}`,
        headers: {
            Authorization: 'asasf',
        },
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: ArticleI): Chainable<ArticleI>;
            removeArticle(articleId: string): Chainable<void>;
        }
    }
}
