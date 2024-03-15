import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { USER_LS_KEY } from '@/shared/const/localstorage';
import { UserI, UserSchema } from '../types/user';
import { setFeatureFlags } from '@/shared/lib/features';

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
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LS_KEY);
            if (user) {
                const parsedUser = JSON.parse(user) as UserI;
                state.authData = parsedUser;
                setFeatureFlags(parsedUser.features);
            }
            state._inited = true;
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LS_KEY);
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
