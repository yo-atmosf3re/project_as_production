import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/LoginSchema';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';

const initialState: LoginSchema = {
    isLoading: false,
    password: '',
    username: '',
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    // ? extraReducers используется для определения промежуточной логики (middleware) для обработки actions внутри среза slice. Этот метод позволяет связать редьюсеры с actions, которые определены в createAsyncThunk или экшенах, созданных с помощью createAction;
    extraReducers: (builder) => {
        // " Ниже extraReducers используется для обработки трех разных случаев, связанных с асинхронным действием loginByUsername: пока действие ожидает выполнения (pending), когда действие успешно завершается (fulfilled) и когда действие отклоняется (rejected);
        // ? Каждый вызов addCase привязывает определенный редьюсер (имеющий два аргумента: состояние и действие) к соответствующему action;
        builder
            .addCase(loginByUsername.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByUsername.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
        // ? Таким образом, extraReducers позволяет определить логику, когда определенное асинхронное действие выполняется, завершается или отклоняется, и обновляет соответствующие поля состояния;
    },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
