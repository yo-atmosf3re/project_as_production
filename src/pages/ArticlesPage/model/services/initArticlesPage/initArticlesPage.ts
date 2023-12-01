import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigI } from 'app/providers/StoreProvider';
import { ARTICLE_SORT_FIELD, ARTICLE_TYPE } from 'entities/Article';
import { SortOrderType } from 'shared/types';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { getArticlesPageInited } from '../../selectors';

/**
 * Инициализирует способ отображения данных в ArticlesPage (вид отображения статей, количество подгружаемых страниц);
 */
export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfigI<string>>(
    'articlesPage/initArticlesPage',
    async (searchParams, thunkApi) => {
        const { getState, dispatch } = thunkApi;

        const inited = getArticlesPageInited(getState());

        if (!inited) {
            const orderFromUrl = searchParams.get('order') as SortOrderType;
            const sortFromUrl = searchParams.get('sort') as ARTICLE_SORT_FIELD;
            const searchFromUrl = searchParams.get('search');
            const typeFromUrl = searchParams.get('type') as ARTICLE_TYPE;

            if (orderFromUrl) {
                dispatch(articlesPageActions.setOrder(orderFromUrl));
            }

            if (sortFromUrl) {
                dispatch(articlesPageActions.setSort(sortFromUrl));
            }

            if (searchFromUrl) {
                dispatch(articlesPageActions.setSearch(searchFromUrl));
            }

            if (typeFromUrl) {
                dispatch(articlesPageActions.setType(typeFromUrl));
            }

            dispatch(articlesPageActions.initState());
            dispatch(fetchArticlesList({}));
        }
    },
);
