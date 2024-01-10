import { StateSchema } from 'app/providers/StoreProvider';
import { COUNTRY } from 'entities/Country';
import { CURRENCY } from 'shared/const/consts';
import { getProfileData } from './getProfileData';

describe('getProfileData', () => {
    test('Should return part of profiles state with object "data" and property "currency"', () => {
        const data = {
            username: 'Alex',
            age: 28,
            country: COUNTRY.ARMENIA,
            lastname: 'Chrome',
            first: '1',
            city: '2',
            currency: CURRENCY.RUB,
        };

        const state: DeepPartial<StateSchema> = {
            profile: {
                data,
            },
        };

        expect(getProfileData(state as StateSchema)).toEqual(data);
    });

    test('Should return undefined with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
});
