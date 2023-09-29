import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getCounterValue } from './getCounterValue';

describe('getCounterValue', () => {
    test('Should return current value', () => {
        const state: DeepPartial<StateSchema> = {
            counter: {
                value: 5,
            },
        };
        expect(getCounterValue(state as StateSchema)).toEqual(5);
    });
});
