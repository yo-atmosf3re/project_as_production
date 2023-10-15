import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProfileI, ProfileSchema } from '../types/profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';

const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // " Ниже extraReducers используется для обработки трех разных случаев, связанных с асинхронным действием loginByUsername: пока действие ожидает выполнения (pending), когда действие успешно завершается (fulfilled) и когда действие отклоняется (rejected);
        // ? Каждый вызов addCase привязывает определенный редьюсер (имеющий два аргумента: состояние и действие) к соответствующему action;
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<ProfileI>) => {
                state.isLoading = false;
                // ? Получаем данные и присваиваем их в state;
                state.data = action.payload;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
        // ? Таким образом, extraReducers позволяет определить логику, когда определенное асинхронное действие выполняется, завершается или отклоняется, и обновляет соответствующие поля состояния;
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
