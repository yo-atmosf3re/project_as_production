import { AsyncThunkAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import axios, { AxiosStatic } from 'axios';

// ? Мокаем axios;
jest.mock('axios');

// ? Подключение типизации, теперь более глубокие методы axios замоканы и типизация подхватывается автоматически;
const mockedAxios = jest.mocked(axios, true);

// ? Тип для функции, которая принимает некий аргумент, а возвращает AsyncThunkAction-функцию;
// " Для более наглядного примера можно заглянуть в loginByUsername.ts где прокомментировано то как это работает и за что отвечает каждый тип. Описание в конце файла в закомментированных частях кода;
type ActionCreatorType<Return, Argument, RejectedValue> =
    (arg: Argument) => AsyncThunkAction<Return, Argument, { rejectValue: RejectedValue }>;

/**
 * Класс, который инкапсулирует логику по тестированию createAsyncThunk-функций.
 *
 * @param Return - тип того, что вернётся в return и то, что возвращает сам asyncThunk;
 * @param Argument - тип для аргумента;
 * @param RejectedValue - тип того, что вернётся в случае ошибки;
 */
export class TestAsyncThunk<Return, Argument, RejectedValue> {
    // ? Для мока;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch: jest.MockedFn<any>;

    // ? Для мока;
    getState: () => StateSchema;

    // ? Функция-thunkCreator;
    actionCreator: ActionCreatorType<Return, Argument, RejectedValue>;

    // ? Мокаем axios каждый раз при создании экземпляра класса;
    api: jest.MockedFunctionDeep<AxiosStatic>;

    // ? Мокаем navigate каждый раз при создании экземпляра класса;
    navigate: jest.MockedFn<any>;

    // ? При создании экземпляра объекта передаём функцию actionCreator, мокаем dispatch и getState;
    constructor(actionCreator: ActionCreatorType<Return, Argument, RejectedValue>) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn();

        // ? Вместо того, чтобы создавать mockedAxios в каждом тесте, храним его в этом файле, присваиваем его this.api при каждом создании экземпляра класса;
        this.api = mockedAxios;
        // ? Так же как и с dispatch, getState - инициализируем navigate, мокая его с помощью jest.fn();
        this.navigate = jest.fn();
    }

    async callThunk(argument: Argument) {
        const action = this.actionCreator(argument);
        const result = await action(this.dispatch, this.getState, {
            api: this.api,
            navigate: this.navigate,
        });

        return result;
    }
}
