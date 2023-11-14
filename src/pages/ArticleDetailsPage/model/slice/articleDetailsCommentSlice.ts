import {
    PayloadAction,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { CommentI } from 'entities/Comment';
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

// " createEntityAdapter - создает адаптер для работы с определенными сущностями (в данном случае - comment). В качестве аргумента принимает объект с опциями, в том числе selectId, который указывает, как получить уникальный идентификатор из объекта comment;
const commentsAdapter = createEntityAdapter<CommentI>({
    selectId: (comment) => comment.id,
});

// ? Получаем комментарии с помощью селектора. Возвращает либо стейт с комментариями, либо изначальный стейт, указанный ниже. Используем это в компонентах. При использовании, getSelectors() предоставляет доступ к некоторым функциям - получение всех идентификаторов, получение всех сущностей, получение всего, получение общего числа сущностей, получение сущности по идентификатору;
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.comments || commentsAdapter.getInitialState(),
);

const articleDetailsCommentSlice = createSlice({
    name: 'articleDetailsComment',
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
        isLoading: false,
        error: undefined,
        // ? Массив с идентификаторами комментариев;
        ids: [],
        // ? Объект со всеми комментариями, где ключ - идентификатор комментария;
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<CommentI[]>) => {
                state.isLoading = false;
                // ? Принимает массив сущностей из action.payload, передаёт их в state (заменяет их, если они уже существуют);
                commentsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: articleDetailsCommetsReducer } = articleDetailsCommentSlice;
