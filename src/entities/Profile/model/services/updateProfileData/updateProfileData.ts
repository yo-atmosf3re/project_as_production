import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigI } from 'app/providers/StoreProvider';
import { ProfileI, VALIDATE_PROFILE_ERROR } from '../../types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';

// ? AsyncThunk, который отправляет введённые пользователем данные на сервер. В дженериках ThunkConfigI указываем тип с перечислением возможных ошибок для того, чтобы более корректно работать с валидацией;
export const updateProfileData = createAsyncThunk<ProfileI, void, ThunkConfigI<VALIDATE_PROFILE_ERROR[]>>(
    'profile/updateProfileData',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        // ? Получаем данные с формы, которые ввёл пользователь (описание работы поля form в других файлах в комментариях);
        const formData = getProfileForm(getState());

        // ? Вызываем валидационную функцию здесь, её возвращаемое значение помещается в переменную, а в аргумент передаётся formData (те данные, которые вводит пользователь, их и проверяем);
        const errors = validateProfileData(formData);

        // ? Если errrors содержит хотя бы одну ошибку, то работа AT-функции останавливается, отрабатывается rejectWithValue функция, в которую помещено содержимое errors;
        if (errors.length) {
            return rejectWithValue(errors);
        }

        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // ? Обновляем данные с помощью put, телом запроса служит formData;
            const response = await extra.api.put<ProfileI>(`/profile/${formData?.id}`, formData);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue([VALIDATE_PROFILE_ERROR.SERVER_ERROR]);
        }
    },
);
// " В компонентах используем useSelector(), а в AT-функциях getState()
