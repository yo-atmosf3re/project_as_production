import { StateSchema } from '@/app/providers/StoreProvider';
import { CURRENCY } from '@/shared/const/consts';
import { getProfileCurrency } from './getProfileCurrency';

describe('getProfileCurrency', () => {
    test('Should return part of profiles state with object "data" and property "currency"', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: {
                    currency: CURRENCY.RUB,
                },
            },
        };

        expect(getProfileCurrency(state as StateSchema)).toEqual(
            CURRENCY.RUB,
        );
    });

    test('Should return empty string with empty data object', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileCurrency(state as StateSchema)).toEqual('');
    });
});
