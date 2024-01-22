import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigI } from '@/app/providers/StoreProvider';
import { CommentI } from '@/entities/Comment';
import { getUserAuthData } from '@/entities/User';
import { getArticleDetailsData } from '@/entities/Article';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

// eslint-disable-next-line max-len
export const addCommentForArticle = createAsyncThunk<
    CommentI,
    string,
    ThunkConfigI<string>>(
        'articleDetails/addCommentForArticle',
        async (text, thunkApi) => {
            const {
                dispatch, extra, rejectWithValue, getState,
            } = thunkApi;
            try {
                const userData = getUserAuthData(getState());
                const article = getArticleDetailsData(getState());

                // ? Если отсутствуют авторизационные данные о пользователе, пустой инпут или отсутствует статья, то выбрасывается ошибка;
                if (!userData || !text || !article) {
                    return rejectWithValue('No data');
                }

                const response = await extra.api.post<CommentI>('/comments', {
                    articleId: article.id,
                    userId: userData.id,
                    text,
                });

                if (!response.data) {
                    throw new Error();
                }

                dispatch(fetchCommentsByArticleId(article.id));

                return response.data;
            } catch (error) {
                return rejectWithValue('error');
            }
        },
    );
