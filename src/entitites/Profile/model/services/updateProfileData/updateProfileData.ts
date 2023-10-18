import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigI } from 'app/providers/StoreProvider';
import { ProfileI } from '../../types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

// ? AsyncThunk, который отправляет введённые пользователем данные на сервер;
export const updateProfileData = createAsyncThunk<ProfileI, void, ThunkConfigI<string>>(
    'profile/updateProfileData',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        // ? Получаем данные с формы, которые ввёл пользователь (описание работы поля form в других файлах в комментариях);
        const formData = getProfileForm(getState());

        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // ? Обновляем данные с помощью put, телом запроса служит formData;
            const response = await extra.api.put<ProfileI>('/profile', formData);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('error');
        }
    },
);
// " В компонентах используем useSelector(), а в AT-функциях getState()
