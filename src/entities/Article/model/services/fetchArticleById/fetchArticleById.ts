import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigI } from '@/app/providers/StoreProvider';
import { ArticleI } from '../../types/article';

/**
 * Получение конкретной статьи по id;
 * @param id - айди, по которому будет осуществляться поиск нужной статьи;
 */
export const fetchArticleById = createAsyncThunk<ArticleI, string | undefined, ThunkConfigI<string>>(
    'article/fetchArticleById',
    async (articleId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            if (!articleId) {
                throw new Error('');
            }

            const response = await extra.api.get<ArticleI>(`/articles/${articleId}`, {
                // ? ;
                params: {
                    _expand: 'user',
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
