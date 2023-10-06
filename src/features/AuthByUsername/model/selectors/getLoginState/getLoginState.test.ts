import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';
import { getLoginState } from './getLoginState';

describe('getLoginState', () => {
    test('Should return loginForm state', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'Alex',
                password: '123',
            },
        };

        expect(getLoginState(state as StateSchema)).toEqual({
            username: 'Alex',
            password: '123',
        });
    });
});
