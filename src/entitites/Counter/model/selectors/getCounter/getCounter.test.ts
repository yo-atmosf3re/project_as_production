import { StateSchema } from 'app/providers/StoreProvider';
// ? DeepPartial - даёт возможность частично или полностью скопировать state. Некоторые свойства, при их наличии, могут полностью скопированы (глубоко) или нет - при их отсутствии;
import { DeepPartial } from '@reduxjs/toolkit';
import { getCounter } from '../getCounter/getCounter';

describe('getCounter', () => {
    test('Should return counter value', () => {
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        };
        // ? Используем "as" для приведения типа к типу state, чтобы типизация не давала ошибок. Такое можно делать в тестах, но в реальном коде использовать "as", опять же, не желательно;
        expect(getCounter(state as StateSchema)).toEqual({ value: 10 });
    });
});
