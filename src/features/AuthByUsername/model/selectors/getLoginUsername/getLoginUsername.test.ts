import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername', () => {
    test('Should return part of state with username', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'username',
            },
        };

        expect(getLoginUsername(state as StateSchema)).toEqual(
            'username',
        );
    });

    test('Should return part of state with username, but with empty object', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {},
        };

        expect(getLoginUsername(state as StateSchema)).toEqual(
            '',
        );
    });
});
