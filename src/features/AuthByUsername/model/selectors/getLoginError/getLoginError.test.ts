import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';
import { getLoginError } from './getLoginError';

describe('getLoginError', () => {
    test('Should return part of state with error', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                error: 'Error',
            },
        };

        expect(getLoginError(state as StateSchema)).toEqual(
            'Error',
        );
    });

    test('Should return part of state with error, but with empty object', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {},
        };

        expect(getLoginError(state as StateSchema)).toEqual(
            '',
        );
    });
});
