import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigI } from '@/app/providers/StoreProvider';
import { UserI, userActions } from '@/entities/User';

interface LoginByUsernamePropsI {
    username: string;
    password: string;
}

// ? Функция createAsyncThunk используется для создания асинхронных событий в Redux Toolkit. Она позволяет создать событие, которое автоматически диспатчит начало, успешное завершение или ошибку асинхронной операции;
// ? Функция loginByUsername принимает два аргумента: название события 'login/loginByUsername' и асинхронную функцию, которая выполняет нужную операцию;
// ? Типизируем rejectValue так, как нужно нам. В данном случае ошибка будет представлена в виде строки, но в других случаях это может быть, что угодно;
export const loginByUsername = createAsyncThunk<
    UserI,
    LoginByUsernamePropsI,
    ThunkConfigI<string>
>(
    // ? В данном примере, createAsyncThunk<User, LoginByUsernameProps> указывает на то, что создаваемое событие будет возвращать значения типа User и принимать в качестве аргумента значения типа LoginByUsernameProps;
    'login/loginByUsername',
    async (authData, thunkApi) => {
        const { dispatch, extra, rejectWithValue } = thunkApi;
        try {
            const response = await extra.api.post<UserI>('/login', authData);

            if (!response.data) {
                throw new Error();
            }

            // ? Сохраянем регистрационные данные в userSlice;
            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (error) {
            console.log(error, 'Login');
            // ? Если происходит ошибка в ходе выполнения операции, мы выводим ошибку в консоль и используем метод thunkAPI.rejectWithValue() для возврата значения 'error'. Это позволяет RTK обрабатывать ошибку правильным образом в структуре состояния всего приложения;
            return rejectWithValue('error');
        }
    },
);
// " Таким образом, созданный thunk loginByUsername автоматически обрабатывает стандартные состояния (начало, успешное завершение, ошибка) асинхронной операции и предоставляет доступ к значениям, возвращенным из асинхронной функции, через обработчики событий, такие как fulfilled, rejected, pending, которые можно использовать, например, в редьюсере;
