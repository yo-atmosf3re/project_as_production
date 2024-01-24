import { rtkApi } from '@/shared/api/rtkApi';
import { RatingI } from '../model/types/types';

/**
 * Интерфейс, описывающий получение данных с сервера;
 */
interface GetArticleRatingArgI {
    userId: string;
    articleId: string;
}

/**
 * Интерфейс, описывающий мутацию данных, которые будут отправлены на сервер;
 */
interface RateArticleArgI {
    userId: string;
    articleId: string;
    rate: number;
    feedback?: string;
}

/**
 * Редьюсер для получения уведомлений;
 */
const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // ? Свойство query у объекта build запрашивает данные с сервера (GET);
        getArticleRating: build.query<RatingI[], GetArticleRatingArgI>({
            query: ({ articleId, userId }) => ({
                url: '/article-ratings',
                params: {
                    articleId,
                    userId,
                },
            }),
        }),
        // ? Свойство mutation у объекта build изменяет данные, а затем отправляет их на сервер или отправляет измененные данные на сервер (если простым языком, то это PUT, POST, DELETE методы);
        rateArticle: build.mutation<void, RateArticleArgI>({
            query: (rateArguments) => ({
                url: '/article-ratings',
                // ? Т.к данные будут сохраняться, указываем метод POST;
                method: 'POST',
                body: rateArguments,
            }),
        }),
    }),
});

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation;
