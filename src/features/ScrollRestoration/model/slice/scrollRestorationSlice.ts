import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ScrollRestorationSchema } from '../types/ScrollRestorationSchema';

const initialState: ScrollRestorationSchema = {
    scroll: {

    },
};

export const scrollRestorationSlice = createSlice({
    name: 'scrollRestoration',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{path: string, position: number}>) => {
            // ? Сохраняем значение объекта по ключу, ключ в данном случае это адрес страницы, а значение - позиция;
            state.scroll[payload.path] = payload.position;
        },
    },
});

export const { actions: scrollRestorationActions } = scrollRestorationSlice;
export const { reducer: scrollRestorationReducer } = scrollRestorationSlice;
