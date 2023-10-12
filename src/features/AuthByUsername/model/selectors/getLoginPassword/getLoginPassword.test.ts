import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword', () => {
    test('Should return part of state with password', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                password: 'password',
            },
        };

        expect(getLoginPassword(state as StateSchema)).toEqual(
            'password',
        );
    });

    test('Should return part of state with password, but with empty object', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getLoginPassword(state as StateSchema)).toEqual('');
    });
});
