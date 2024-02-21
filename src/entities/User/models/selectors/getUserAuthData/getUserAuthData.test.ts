import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserAuthData } from './getUserAuthData';

describe('getUserAuthData', () => {
    test('Should return part of users state with authData', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: {
                    id: '1',
                    username: '1',
                },
            },
        };

        expect(getUserAuthData(state as StateSchema)).toEqual(
            {
                id: '1',
                username: '1',
            },
        );
    });

    test('Should return undefined with empty users object', () => {
        const state: DeepPartial<StateSchema> = {
            user: {

            },
        };

        expect(getUserAuthData(state as StateSchema)).toEqual(undefined);
    });
});
