import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ARTICLE_VIEW, ArticleI } from 'entities/Article';
import { StateSchema } from 'app/providers/StoreProvider';
import { ARTICLES_VIEW_LS_KEY } from 'shared/const/localstorage';
import { ARTICLE_SORT_FIELD } from 'entities/Article/model/types/article';
import { SortOrderType } from 'shared/types';
import { ArticlesPageSchema } from '../types/articlesPageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

const articlesAdapter = createEntityAdapter<ArticleI>({
    selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

export const articlesPageSlice = createSlice({
    name: 'articlePage',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ARTICLE_VIEW.BIG,
        page: 1,
        hasMore: true,
        limit: 9,
        sort: ARTICLE_SORT_FIELD.CREATED,
        search: '',
        order: 'asc',
        _inited: false,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ARTICLE_VIEW>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_VIEW_LS_KEY, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setOrder: (state, action: PayloadAction<SortOrderType>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ARTICLE_SORT_FIELD>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(ARTICLES_VIEW_LS_KEY) as ARTICLE_VIEW;
            state.view = view;
            // ? Подгрузка четырёх больших, либо девять маленьких статей, в зависимости от view, которое установил пользователь;
            state.limit = view === ARTICLE_VIEW.BIG ? 4 : 9;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<ArticleI[]>) => {
                state.isLoading = false;
                // ? Принимает массив сущностей из action.payload, передаёт их в state в конец;
                articlesAdapter.addMany(state, action.payload);
                // ? Уточняем наличие данных на сервере: если есть хотя бы один элемент в массиве, то hasMore будет true, иначе пустой массив сигнализирует о том, что данных больше нет (нужно для подгрузки данных в ArticlesPage по этому флагу);
                state.hasMore = action.payload.length > 0;
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
