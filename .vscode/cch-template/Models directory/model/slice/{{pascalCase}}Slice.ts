import { createSlice } from '@reduxjs/toolkit';
import { {{pascalCase}}Schema } from '../types/{{pascalCase}}Schema';

const initialState: {{pascalCase}}Schema = {};

export const {{pascalCase}}Slice = createSlice({
    name: '{{pascalCase}}',
    initialState,
    reducers: {},
});

export const { actions: sliceActions } = {{pascalCase}}Slice;
export const { reducer: sliceReducer } = {{pascalCase}}Slice;
