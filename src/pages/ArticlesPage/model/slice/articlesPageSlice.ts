import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
    ArticleI,
} from 'entities/Article';
import { StateSchema } from 'app/providers/StoreProvider';
import { ARTICLES_VIEW_LS_KEY } from 'shared/const/localstorage';
import { SortOrderType } from 'shared/types';
import { ARTICLE_VIEW, ARTICLE_SORT_FIELD, ARTICLE_TYPE } from 'shared/const/consts';
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
        type: ARTICLE_TYPE.ALL,
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
        setType: (state, action: PayloadAction<ARTICLE_TYPE>) => {
            state.type = action.payload;
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
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                // ? Очищаем state в случае наличия какой-либо сортировки или фильтрации;
                if (action.meta.arg.replace) {
                    articlesAdapter.removeAll(state);
                }
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.isLoading = false;
                // ? Уточняем наличие данных на сервере: если с сервера пришло статей большее или равное количество limit (означает, что данные нужно подгрузить ещё), то hasMore будет true, иначе если false, то данные подгружаться больше не будут, потому что, если, например, пришло 5 статей, а лимит 10, то подгрузка больше не нужна (нужно для подгрузки данных в ArticlesPage по этому флагу);
                state.hasMore = action.payload.length >= state.limit;

                // ? Флаг replace сигнализирует о применении какой-либо сортировки или фильтра, и если такое происходит, то данные запрашиваются полностью и затираются старые. В блоке else происходит добавление данных в конец для поддержки бесконечного скролла (стандартное поведение, до внедрения флага replace);
                if (action.meta.arg.replace) {
                    articlesAdapter.setAll(state, action.payload);
                } else {
                    // ? Принимает массив сущностей из action.payload, передаёт их в state в конец;
                    articlesAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
