import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigI } from 'app/providers/StoreProvider';
import { ArticleI } from 'entities/Article';
import { getArticlesPageLimit } from '../../selectors/getArticlesPageLimit/getArticlesPageLimit';
import { getArticlesPageOrder } from '../../selectors/getArticlesPageOrder/getArticlesPageOrder';
import { getArticlesPageSearch } from '../../selectors/getArticlesPageSearch/getArticlesPageSearch';
import { getArticlesPageSort } from '../../selectors/getArticlesPageSort/getArticlesPageSort';
import { getArticlesPageNumber } from '../../selectors/getArticlesPageNumber/getArticlesPageNumber';

interface FetchArticlesListPropsI {
    replace?: boolean;
}

/**
 * Запрос списка статей с применением различных фильтров;
 * @param replace - флаг сигнализирующий о том, применяется ли какая-либо сортировка или фильтр, и в зависимости от этого флага выполняется различная логика при работе с состояниями AT-функции;
 */
export const fetchArticlesList = createAsyncThunk<ArticleI[], FetchArticlesListPropsI, ThunkConfigI<string>>(
    'articlesPage/fetchArticlesList',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        const limit = getArticlesPageLimit(getState());
        const order = getArticlesPageOrder(getState());
        const sort = getArticlesPageSort(getState());
        const search = getArticlesPageSearch(getState());
        const page = getArticlesPageNumber(getState());

        try {
            const response = await extra.api.get<ArticleI[]>('/articles', {
                params: {
                    // ? Это поле нужно для того, чтобы отрисовывать аватар пользователя, если view будет со значением BIG;
                    _expand: 'user',
                    // ? Обращаемся к пагинации и лимиту;
                    _limit: limit,
                    _page: page,
                    // ? Обращаемся к сортировке, порядку и поиску;
                    _sort: sort,
                    _order: order,
                    q: search,
                },
            });
            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            console.log(error);

            return rejectWithValue('error');
        }
    },
);
