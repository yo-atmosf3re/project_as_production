import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigI } from 'app/providers/StoreProvider';
import { ArticleI } from 'entities/Article';

/**
 * Получение статей для списка рекомендаций на странице ArticleDetailsPage. Возвращает 4 статьи за один запрос;
 */
export const fetchArticleRecommendations = createAsyncThunk<ArticleI[], void, ThunkConfigI<string>>(
    'articleDetailsPage/fetchArticleRecommendations',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<ArticleI[]>('/articles', {
                params: {
                    _limit: 4,
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
