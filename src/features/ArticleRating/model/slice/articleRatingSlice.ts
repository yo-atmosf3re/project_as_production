import { createSlice } from '@reduxjs/toolkit';
// import { types } from '../types/types';

const initialState: {value?: number} = {};

export const articleRatingSlice = createSlice({
    name: 'articleRating',
    initialState,
    reducers: {},
});

export const { actions: articleRatingActions } = articleRatingSlice;
export const { reducer: articleRatingReducer } = articleRatingSlice;
