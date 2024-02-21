import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileLastname } from './getProfileLastname';

describe('getProfileLastname', () => {
    test('Should return part of profiles state with object "data" and property "lastname"', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: {
                    lastname: 'Chrome',
                },
            },
        };

        expect(getProfileLastname(state as StateSchema)).toEqual('Chrome');
    });

    test('Should return empty string with empty data object', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileLastname(state as StateSchema)).toEqual('');
    });
});
