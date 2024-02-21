import { StateSchema } from '@/app/providers/StoreProvider';
import { getArticlesPageError } from './getArticlesPageError';

describe('getArticlesPageError', () => {
    test('Should return part of state with view', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                error: 'Error',
            },
        };

        expect(getArticlesPageError(state as StateSchema)).toEqual(
            'Error',
        );
    });

    test('Should return undefined with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticlesPageError(state as StateSchema)).toEqual(undefined);
    });
});
