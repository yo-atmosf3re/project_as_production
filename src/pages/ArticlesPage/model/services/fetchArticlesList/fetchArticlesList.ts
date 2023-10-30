import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigI } from 'app/providers/StoreProvider';
import { ArticleI } from 'entities/Article';

/**
 * Получение комментариев для конкретной статьи по id;
 * @param id - айди статьи, для которой будут запрашиваться нужные комментарии;
 */
export const fetchArticlesList = createAsyncThunk<ArticleI[], void, ThunkConfigI<string>>(
    'articlePage/fetchArticlesList',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<ArticleI[]>('/articles', {
                params: {
                    // ? Это поле нужно для того, чтобы отрисовывать аватар пользователя, если view будет со значением BIG;
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
