import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigI } from 'app/providers/StoreProvider';
import { getArticlesPageHasMore } from '../../selectors/getArticlesPageHasMore/getArticlesPageHasMore';
import { getArticlesPageNumber } from '../../selectors/getArticlesPageNumber/getArticlesPageNumber';
import { getArticlesPageIsLoading } from '../../selectors/getArticlesPageIsLoading/getArticlesPageIsLoading';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

/**
 * Воспроизводит подгрузку порции новых статей при использовании бесконечного скролла;
 */
export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfigI<string>>(
    'articlesPage/fetchNextArticlesPage',
    async (_, thunkApi) => {
        const { getState, dispatch } = thunkApi;

        const hasMore = getArticlesPageHasMore(getState());
        const page = getArticlesPageNumber(getState());
        const isLoading = getArticlesPageIsLoading(getState());

        // ? Флаги, которые активируется в том случае, если с сервера вообще пришло какое-либо количество данных и нет загрузки;
        if (hasMore && !isLoading) {
            // ? Устанавливаем следующую страницу;
            dispatch(articlesPageActions.setPage(page + 1));
            // ? Запрашиваем порцию статей с новой (следующей) страницы;
            dispatch(fetchArticlesList({}));
        }
    },
);
