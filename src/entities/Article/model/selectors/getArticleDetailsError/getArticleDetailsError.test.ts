import { StateSchema } from '@/app/providers/StoreProvider';
import { getArticleDetailsError } from './getArticleDetailsError';

describe('getArticleDetailsError', () => {
    test('Should return part of state with error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                error: 'Error',
            },
        };

        expect(getArticleDetailsError(state as StateSchema)).toEqual(
            'Error',
        );
    });

    test('Should return undefined with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
    });
});
