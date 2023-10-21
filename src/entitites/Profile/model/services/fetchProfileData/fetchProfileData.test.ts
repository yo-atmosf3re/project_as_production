import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { COUNTRY } from 'entitites/Country';
import { CURRENCY } from 'entitites/Currency';
import { fetchProfileData } from './fetchProfileData';

const DATA = {
    username: 'Alex',
    age: 28,
    country: COUNTRY.ARMENIA,
    lastname: 'Chrome',
    first: '1',
    city: '2',
    currency: CURRENCY.RUB,
};

describe('fetchProfileData', () => {
    test('CreateAsynThunk function fetchProfileData should be call get request has been called, status result has been fulfilled, payload has been correct', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data: DATA }));
        const result = await thunk.callThunk();

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(DATA);
    });

    test('CreateAsynThunk function fetchProfileData should be return status code 403', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
    });
});
