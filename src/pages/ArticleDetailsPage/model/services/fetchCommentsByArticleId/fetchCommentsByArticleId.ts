import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigI } from '@/app/providers/StoreProvider';
import { CommentI } from '@/entities/Comment';

/**
 * Получение комментариев для конкретной статьи по id;
 * @param id - айди статьи, для которой будут запрашиваться нужные комментарии;
 */
export const fetchCommentsByArticleId = createAsyncThunk<
    CommentI[],
    string | undefined,
    ThunkConfigI<string>
>('articleDetails/fetchCommentsByArticleId', async (articleId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    // ? При отсутствии id выбрасываем ошибку;
    if (!articleId) {
        return rejectWithValue('error');
    }

    try {
        const response = await extra.api.get<CommentI[]>('/comments', {
            params: {
                articleId,
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
});
