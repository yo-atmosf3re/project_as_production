import { AsyncThunkAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

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

    // ? При создании экземпляра объекта передаём функцию actionCreator, мокаем dispatch и getState;
    constructor(actionCreator: ActionCreatorType<Return, Argument, RejectedValue>) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn();
    }

    async callThunk(argument: Argument) {
        const action = this.actionCreator(argument);
        const result = await action(this.dispatch, this.getState, undefined);

        return result;
    }
}
