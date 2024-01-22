import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileError } from './getProfileError';

describe('getProfileError', () => {
    test('Should return part of profiles state with property "error"', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: 'Error',
            },
        };

        expect(getProfileError(state as StateSchema)).toEqual('Error');
    });

    test('Should return undefined with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileError(state as StateSchema)).toEqual(undefined);
    });
});
