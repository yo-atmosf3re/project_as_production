import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { counterActions, counterReducer } from './counterSlice';
import { CounterSchema } from '../types/counterSchema';

describe('counterSlice', () => {
    test('Slice should be created, value should be decrement', () => {
        // ? Берём только часть того стейта, с которым будем работать;
        const state: CounterSchema = {
            value: 10,
        };
        // ? По классике: берём стейт, нужный редьюсер, в ответе ожидаем объект с измененным свойством;
        expect(
            counterReducer(state, counterActions.decrement()),
        ).toEqual({
            value: 9,
        });
    });
});

describe('counterSlice', () => {
    test('Slice should be created, value should be increment', () => {
        const state: CounterSchema = {
            value: 10,
        };

        expect(
            counterReducer(state, counterActions.increment()),
        ).toEqual({
            value: 11,
        });
    });
});

describe('counterSlice', () => {
    test('Slice should be created, should work with empty state', () => {
        // ? Здесь устанавливается стейт по дефолту из стора (initialState), то есть в нашем случае это будет {value: 0}, вот с ним данный тест и будет работать;
        expect(
            counterReducer(undefined, counterActions.increment()),
        ).toEqual({
            value: 1,
        });
    });
});
