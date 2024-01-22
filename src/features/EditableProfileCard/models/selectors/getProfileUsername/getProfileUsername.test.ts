import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileUsername } from './getProfileUsername';

describe('getProfileUsername', () => {
    test('Should return part of profiles state with object "data" and property "username"', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: {
                    username: 'username',
                },
            },
        };

        expect(getProfileUsername(state as StateSchema)).toEqual('username');
    });

    test('Should return empty string with empty data object', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileUsername(state as StateSchema)).toEqual('');
    });
});
