import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
});

export const { actions: sliceActions } = commentSlice;
export const { reducer: sliceReducer } = commentSlice;
