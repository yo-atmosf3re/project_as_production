import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { USER_LS_KEY } from '@/shared/const/localstorage';
import { UserI, UserSchema } from '../types/user';
import { setFeatureFlags } from '@/shared/lib/features';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { JsonSettingsI } from '../types/jsonSettings';
import { initAuthData } from '../services/initAuthData';

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<UserI>) => {
            state.authData = action.payload;
            setFeatureFlags(action.payload.features);

            // ? Записываем и сохраняем ответ в LS, переведя эти данные в строку, потому что в LS можно сохранять только строки;
            // " Имитация сохранения т.н токена;
            localStorage.setItem(USER_LS_KEY, action.payload.id);
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LS_KEY);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                saveJsonSettings.fulfilled,
                (state, {payload}: PayloadAction<JsonSettingsI>) => {
                    if(state.authData) {
                        state.authData.jsonSettings = payload;
                    }
                },
            );
        builder
            .addCase(
                initAuthData.fulfilled,
                (state, {payload}: PayloadAction<UserI>) => {
                    state.authData = payload;
                    setFeatureFlags(payload.features);
                    state._inited = true;
                },
            );
        builder
            .addCase(
                initAuthData.rejected,
                (state) => {
                    state._inited = true;
                },
            );
    }
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
