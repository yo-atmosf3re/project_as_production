import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProfileI, ProfileSchema } from '../types/profile';
import { fetchProfileData, updateProfileData } from '../../index';

const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        // ? Меняем статус readonly, нужен для инпутов в карточке профиля;
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        // ? Ставим формы в режим "Для чтения", сбрасываем введенные пользователем изменения, присваивая значение data для form;
        cancelEdit: (state) => {
            state.readonly = true;
            state.form = state.data;
        },
        // ? Общий action для обновления всей data. Создаёт новый объект, переносит туда старую data, а затем новую data из action.payload, перезатерая старые поля объекта;
        updateProfile: (state, action: PayloadAction<ProfileI>) => {
            state.form = {
                ...state.data,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        // " Ниже extraReducers используется для обработки трех разных случаев, связанных с асинхронным действием fetchProfileData: пока действие ожидает выполнения (pending), когда действие успешно завершается (fulfilled) и когда действие отклоняется (rejected);
        // ? Каждый вызов addCase привязывает определенный редьюсер (имеющий два аргумента: состояние и действие) к соответствующему action;
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<ProfileI>) => {
                state.isLoading = false;
                // ? Получаем данные и присваиваем их в state. Данные data не будут изменяться, они будут получены один раз с сервера. Это нужно для отслеживания изменений и возможности откатить данные назад, нажав кнопку "Отменить" в UI;
                state.data = action.payload;
                // ? data меняться не будет, а form меняться будет при каждом изменении полей ввода пользователем;
                state.form = action.payload;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<ProfileI>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
        // ? Таким образом, extraReducers позволяет определить логику, когда определенное асинхронное действие выполняется, завершается или отклоняется, и обновляет соответствующие поля state;
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
