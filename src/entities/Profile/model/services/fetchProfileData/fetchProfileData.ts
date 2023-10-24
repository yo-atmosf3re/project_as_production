import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigI } from 'app/providers/StoreProvider';
import { ProfileI } from '../../types/profile';

// ? Получение данных по профилю;
export const fetchProfileData = createAsyncThunk<ProfileI, void, ThunkConfigI<string>>(
    'profile/fetchProfileData',
    // ? Т.к это get-запрос, то и в аргументе не будет никакой authDat'ы
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        try {
            const response = await extra.api.get<ProfileI>('/profile');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            console.log(error);

            return rejectWithValue('error');
        }
    },
);
