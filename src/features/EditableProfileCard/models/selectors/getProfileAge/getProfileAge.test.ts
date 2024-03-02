import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileAge } from './getProfileAge';

describe('getProfileAge', () => {
    test('Should return part of profiles state with object "data" and property "age"', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: {
                    age: 11,
                },
            },
        };

        expect(getProfileAge(state as StateSchema)).toEqual(11);
    });

    test('Should return empty string with empty data object', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileAge(state as StateSchema)).toEqual('');
    });
});
