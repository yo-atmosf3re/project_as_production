import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { COUNTRY } from 'entities/Country';
import { CURRENCY } from 'entities/Currency';
import { updateProfileData } from './updateProfileData';
import { VALIDATE_PROFILE_ERROR } from '../../types/profile';

const data = {
    username: 'Alex',
    age: 28,
    country: COUNTRY.ARMENIA,
    lastname: 'Chrome',
    first: '1',
    city: '2',
    currency: CURRENCY.RUB,
};

describe('updateProfileData', () => {
    test('CreateAsynThunk function updateProfileData should be call get request has been called, status result has been fulfilled, payload has been correct', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('CreateAsynThunk function updateProfileData should be return status code 403, error should be returned', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            VALIDATE_PROFILE_ERROR.SERVER_ERROR,
        ]);
    });
});
