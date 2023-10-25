import { createSlice } from '@reduxjs/toolkit';
import { Schema } from '../types/Schema';

const initialState: Schema = {};

export const Slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {},
});

export const { actions: SliceActions } = Slice;
export const { reducer: SliceReducer } = Slice;
