import { createSlice } from '@reduxjs/toolkit';
import { ArticleEditPageSchema } from '../types/ArticleEditPageSchema';

const initialState: ArticleEditPageSchema = {};

export const ArticleEditPageSlice = createSlice({
    name: 'ArticleEditPage',
    initialState,
    reducers: {},
});

export const { actions: sliceActions } = ArticleEditPageSlice;
export const { reducer: sliceReducer } = ArticleEditPageSlice;
