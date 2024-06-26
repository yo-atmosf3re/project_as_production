import { COUNTRY } from '@/entities/Country';
import { CURRENCY, VALIDATE_PROFILE_ERROR } from '@/shared/const/consts';

import { validateProfileData } from './validateProfileData';

const DATA = {
    username: 'Alex',
    age: 28,
    country: COUNTRY.ARMENIA,
    lastname: 'Chrome',
    first: '1',
    city: '2',
    currency: CURRENCY.RUB,
};

describe('validateProfileData', () => {
    test('Success form data', async () => {
        const result = validateProfileData(DATA);

        expect(result).toEqual([]);
    });

    test('Data without first and last name', async () => {
        const result = validateProfileData({
            ...DATA,
            first: '',
            lastname: '',
        });

        expect(result).toEqual([VALIDATE_PROFILE_ERROR.INCORRECT_USER_DATA]);
    });

    test('Incorrect age', async () => {
        const result = validateProfileData({ ...DATA, age: NaN });

        expect(result).toEqual([VALIDATE_PROFILE_ERROR.INCORRECT_AGE]);
    });

    test('Without country', async () => {
        const result = validateProfileData({ ...DATA, country: undefined });

        expect(result).toEqual([VALIDATE_PROFILE_ERROR.INCORRECT_COUNTRY]);
    });

    test('Empty data, incorrect all data', async () => {
        const result = validateProfileData({});

        expect(result).toEqual([
            VALIDATE_PROFILE_ERROR.INCORRECT_USER_DATA,
            VALIDATE_PROFILE_ERROR.INCORRECT_AGE,
            VALIDATE_PROFILE_ERROR.INCORRECT_COUNTRY,
        ]);
    });
});
