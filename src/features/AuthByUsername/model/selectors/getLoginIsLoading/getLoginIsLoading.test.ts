import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginIsLoading } from './getLoginIsLoading';

describe('getLoginIsLoading', () => {
    test('Should return part of state with isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                isLoading: true,
            },
        };

        expect(getLoginIsLoading(state as StateSchema)).toEqual(
            true,
        );
    });

    test('Should return part of state with isLoading, but with empty string', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getLoginIsLoading(state as StateSchema)).toEqual(
            false,
        );
    });
});
