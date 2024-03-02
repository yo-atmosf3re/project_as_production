import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileCity } from './getProfileCity';

describe('getProfileCity', () => {
    test('Should return part of profiles state with object "data" and property "city"', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: {
                    city: 'Moscow',
                },
            },
        };

        expect(getProfileCity(state as StateSchema)).toEqual('Moscow');
    });

    test('Should return empty string with empty data object', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileCity(state as StateSchema)).toEqual('');
    });
});
