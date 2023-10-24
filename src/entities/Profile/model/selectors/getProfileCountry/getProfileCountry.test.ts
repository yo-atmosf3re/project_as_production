import { StateSchema } from 'app/providers/StoreProvider';
import { COUNTRY } from 'entities/Country';
import { getProfileCountry } from './getProfileCountry';

describe('getProfileCountry', () => {
    test('Should return part of profiles state with object "data" and property "country"', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: {
                    country: COUNTRY.RUSSIA,
                },
            },
        };

        expect(getProfileCountry(state as StateSchema)).toEqual(
            COUNTRY.RUSSIA,
        );
    });

    test('Should return empty string with empty data object', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileCountry(state as StateSchema)).toEqual('');
    });
});
