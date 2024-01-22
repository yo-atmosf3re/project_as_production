import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';

/**
 * Удобный селектор, возвращающий boolean-флаг, который показывает является ли пользователь автором статьи или нет. AT-функция `fetchArticleById` при запросе на сервер так же возвращает данные о `user`, чтобы при сравнении в данном селекторе не было проблем с возвращаемым значением в поле `user`;
 */
export const getCanEditArticle = createSelector(
    getArticleDetailsData,
    getUserAuthData,
    (article, user) => {
        if (!article || !user) {
            return false;
        }

        return article.user.id === user.id;
    },
);
