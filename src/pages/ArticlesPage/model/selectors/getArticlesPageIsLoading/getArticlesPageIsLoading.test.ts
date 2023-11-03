import { StateSchema } from 'app/providers/StoreProvider';
import { getArticlesPageIsLoading } from './getArticlesPageIsLoading';

describe('getArticlesPageIsLoading', () => {
    test('Should return part of state with isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                isLoading: false,
            },
        };

        expect(getArticlesPageIsLoading(state as StateSchema)).toEqual(
            false,
        );
    });

    test('Should return false with empty state, because false it\'s default value', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticlesPageIsLoading(state as StateSchema)).toEqual(false);
    });
});
