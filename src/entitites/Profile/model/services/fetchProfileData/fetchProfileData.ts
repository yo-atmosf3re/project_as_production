import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigI } from 'app/providers/StoreProvider';
import { ProfileI } from '../../types/profile';

// eslint-disable-next-line max-len
export const fetchProfileData = createAsyncThunk<ProfileI, void, ThunkConfigI<string>>(
    'profile/fetchProfileData',
    // ? Т.к это get-запрос, то и в аргументе не будет никакой authDat'ы
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
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
// " Таким образом, созданный thunk loginByUsername автоматически обрабатывает стандартные состояния (начало, успешное завершение, ошибка) асинхронной операции и предоставляет доступ к значениям, возвращенным из асинхронной функции, через обработчики событий, такие как fulfilled, rejected, pending, которые можно использовать, например, в редьюсере;
