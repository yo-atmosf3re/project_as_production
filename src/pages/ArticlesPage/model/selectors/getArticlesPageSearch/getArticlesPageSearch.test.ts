import { StateSchema } from 'app/providers/StoreProvider';
import { getArticlesPageSearch } from './getArticlesPageSearch';

describe('getArticlesPageSearch', () => {
    test('Should return part of state with search', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                search: 'Search',
            },
        };

        expect(getArticlesPageSearch(state as StateSchema)).toEqual(
            'Search',
        );
    });

    test('Should return empty string if state or selector\'s value is equal undefined', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticlesPageSearch(state as StateSchema)).toEqual(
            '',
        );
    });
});
