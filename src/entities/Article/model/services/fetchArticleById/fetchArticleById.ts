import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigI } from 'app/providers/StoreProvider';
import { ArticleI } from '../../types/article';

/**
 * Получение конкретной статьи по id;
 * @param id - айди, по которому будет осуществляться поиск нужной статьи;
 */
export const fetchArticleById = createAsyncThunk<ArticleI, string, ThunkConfigI<string>>(
    'article/fetchArticleById',
    async (articleId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        try {
            const response = await extra.api.get<ArticleI>(`/articles/${articleId}`);
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
