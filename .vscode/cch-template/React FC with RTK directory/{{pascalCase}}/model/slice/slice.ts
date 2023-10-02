import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const slice = createSlice({
    name: '{{pascalCase}}',
    initialState,
    reducers: {},
});

export const { actions: sliceActions } = slice;
export const { reducer: sliceReducer } = slice;
