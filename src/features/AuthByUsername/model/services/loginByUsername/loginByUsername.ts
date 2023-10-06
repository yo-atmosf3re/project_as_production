import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entitites/User';
import i18n from 'shared/config/i18n/i18n';
import { USER_LS_KEY } from 'shared/const/localstorage';

interface LoginByUsernameProps {
    username: string;
    password: string
}

// ? Функция createAsyncThunk используется для создания асинхронных событий в Redux Toolkit. Она позволяет создать событие, которое автоматически диспатчит начало, успешное завершение или ошибку асинхронной операции;
// ? Функция loginByUsername принимает два аргумента: название события 'login/loginByUsername' и асинхронную функцию, которая выполняет нужную операцию;
// ? Типизируем rejectValue так, как нужно нам. В данном случае ошибка будет представлена в виде строки, но в других случаях это может быть, что угодно;
export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
    // ? В данном примере, createAsyncThunk<User, LoginByUsernameProps> указывает на то, что создаваемое событие будет возвращать значения типа User и принимать в качестве аргумента значения типа LoginByUsernameProps;
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        try {
            const response = await axios.post<User>('http://localhost:7777/login', authData);

            if (!response.data) throw new Error();

            // ? Записываем и сохраняем ответ в LS, переведя эти данные в строку, потому что в LS можно сохранять только строки;
            // " Имитация сохранения т.н токена;
            localStorage.setItem(USER_LS_KEY, JSON.stringify(response.data));
            // ? Сохраянем регистрационные данные в userSlice;
            thunkAPI.dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (error) {
            console.log(error, 'Login');
            // ? Если происходит ошибка в ходе выполнения операции, мы выводим ошибку в консоль и используем метод thunkAPI.rejectWithValue() для возврата значения 'error'. Это позволяет RTK обрабатывать ошибку правильным образом в структуре состояния всего приложения;
            return thunkAPI.rejectWithValue(i18n.t('Вы ввели неверный логин или пароль!'));
        }
    },
);
// " Таким образом, созданный thunk loginByUsername автоматически обрабатывает стандартные состояния (начало, успешное завершение, ошибка) асинхронной операции и предоставляет доступ к значениям, возвращенным из асинхронной функции, через обработчики событий, такие как fulfilled, rejected, pending, которые можно использовать, например, в редьюсере;
