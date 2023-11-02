import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigI } from 'app/providers/StoreProvider';
import { ArticleI } from 'entities/Article';
import { getArticlesPageLimit } from '../../selectors/getArticlesPageLimit/getArticlesPageLimit';

interface FetchArticlesListPropsI {
    page?: number;
}

/**
 * Получение комментариев для конкретной статьи по id;
 * @param id - айди статьи, для которой будут запрашиваться нужные комментарии;
 */
export const fetchArticlesList = createAsyncThunk<ArticleI[], FetchArticlesListPropsI, ThunkConfigI<string>>(
    'articlesPage/fetchArticlesList',
    async ({ page = 1 }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        const limit = getArticlesPageLimit(getState());

        try {
            const response = await extra.api.get<ArticleI[]>('/articles', {
                params: {
                    // ? Это поле нужно для того, чтобы отрисовывать аватар пользователя, если view будет со значением BIG;
                    _expand: 'user',
                    // ? Обращаемся к пагинации и лимиту;
                    _limit: limit,
                    _page: page,
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
