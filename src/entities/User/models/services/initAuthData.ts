import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigI } from '@/app/providers/StoreProvider';
import { UserI } from '../types/user';
import { USER_LS_KEY } from '@/shared/const/localstorage';
import { getUserDataByIdQuery } from '../../api/userApi';

/**
 * Функция, которая возвращает инициализационные данные аутентификации пользователя;
 */
export const initAuthData = createAsyncThunk<
    UserI, // ? То, что вернёт функция;
    void, // ? Отсутствующий аргумент функции - то есть, функция ничего не принимает;
    ThunkConfigI<string>
>('user/initAuthData', async (_, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    // ? Получения айди юзера из LS;
    const userId = localStorage.getItem(USER_LS_KEY);

    // ? Если айди юзера нет, то функция завершает свою работу со отклонением значения, в данном случае - пустая строка;
    if(!userId) return rejectWithValue('');

    try {
        // ? Выполнение запроса на сервер, который запрашивает данные о пользователе по айди, который берётся выше из LS;
        const response = await dispatch(
            getUserDataByIdQuery(userId)
        )
            .unwrap(); // ? Получение доступа к успешному результату или ошибке;

        return response;
        
    } catch (error) {
        console.log(error);
        return rejectWithValue('');
    }
});
