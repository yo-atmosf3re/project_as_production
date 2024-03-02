import { userActions } from '@/entities/User';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';

describe('loginByUsername', () => {
    test('CreateAsynThunk function loginByUsername should be call correct dispatch with correct data and argument, call post request has been called, status result has been fulfilled, dispatch has been called 3 times, payload has been correct', async () => {
        const userValue = {
            username: '1',
            id: '1',
        };

        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
        const result = await thunk.callThunk({ username: '1', password: '1' });

        expect(thunk.dispatch).toHaveBeenCalledWith(
            userActions.setAuthData(userValue),
        );
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userValue);
    });

    test('CreateAsynThunk function loginByUsername should be return status code 403, dispatch has been called 2 times', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk({ username: '1', password: '1' });

        // ? Если произошла какая-то ошибка и статус rejected, то диспатч вызывается всего два раза: первый раз при вызове loginByUsername, а второй при return thunkAPI.rejectWithValue();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual('error');
    });
});

// ! Вариант тестирования asyncThunk-функции без вспомогательного класса TestAsyncThunk;
// ? Ниже закомментированный код с комментариями и полным разбором того как работает тестирование подобных функций;
// let dispatch: Dispatch;
// let getState: () => StateSchema;

// beforeEach(() => {
//     dispatch = jest.fn();
//     getState = jest.fn();
// });

// test('CreateAsynThunk function loginByUsername should be call correct dispatch with correct data and argument, call post request has been called, status result has been fulfilled, dispatch has been called 3 times, payload has been correct', async () => {
//     const userValue = {
//         username: '1',
//         id: '1',
//     };

//     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
// ? loginByUsername - функция createAsyncThunk, она создаёт какой-то асинхронный экшен, потом этот экшен вызываем и помещаем его в переменную action;
//     const action = loginByUsername({
//         username: '1',
//         password: '1',
//     });
// ? Переменная action возвращает Promise, поэтому указываем здесь await, а в аргументы action передаём замоканные функции dispatch, getState и undefined, потому что у нас нет аргумента для extra (extra пригодится нам позже). В result хранится сам экшен-объект, в котором есть свойства type, payload, meta и так далее;
// ? На основании полученных данных из result можно делать различные проверки - проверка статусов, аргументов и что вернулось;
//     const result = await action(dispatch, getState, undefined);
// ? Проверяем вызов dispatch с нужным аргументом (если где-то произошла ошибка, то он может быть и не вызван), проверяем это с нужными данными в переменной userValue;
//     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
// ? Как вызываются диспатчи: первый раз при первом вызове loginByUsername, второй раз внутри при вызове userActions.setAuthData(), а третий раз, когда экшен успешно выполняется (происходит fulfilled), то есть, когда происходит return response.data. Итого - диспатч вызывается три раза, что и проверяется ниже;
//     expect(dispatch).toHaveBeenCalledTimes(3);
// ? Проверяем, что post вообще вызвался;
//     expect(mockedAxios.post).toHaveBeenCalled();
// ? Проверяем возвращаемый статус экшена;
//     expect(result.meta.requestStatus).toBe('fulfilled');
// ? Проверяем возвращаемые данные;
//     expect(result.payload).toEqual(userValue);
// });

// test('CreateAsynThunk function loginByUsername should be return status code 403, dispatch has been called 2 times', async () => {
//     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
//     const action = loginByUsername({ username: '1', password: '1' });
//     const result = await action(dispatch, getState, undefined);

// ? Если произошла какая-то ошибка и статус rejected, то диспатч вызывается всего два раза: первый раз при вызове loginByUsername, а второй при return thunkAPI.rejectWithValue();
//     expect(dispatch).toHaveBeenCalledTimes(2);
//     expect(mockedAxios.post).toHaveBeenCalled();
//     expect(result.meta.requestStatus).toBe('rejected');
//     expect(result.payload).toEqual('error');
// });
