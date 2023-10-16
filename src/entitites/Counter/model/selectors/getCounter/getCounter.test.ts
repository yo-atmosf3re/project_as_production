import { StateSchema } from 'app/providers/StoreProvider';
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
