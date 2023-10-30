import { StateSchema } from 'app/providers/StoreProvider';
import { getArticlesPageIsLoading } from './getArticlesPageIsLoading';

describe('getArticlesPageIsLoading', () => {
    test('Should return part of state with view', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                isLoading: false,
            },
        };

        expect(getArticlesPageIsLoading(state as StateSchema)).toEqual(
            false,
        );
    });

    test('Should return undefined with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticlesPageIsLoading(state as StateSchema)).toEqual(undefined);
    });
});
