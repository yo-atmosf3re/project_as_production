import { StateSchema } from '@/app/providers/StoreProvider';
import { getArticlesPageNumber } from './getArticlesPageNumber';

describe('getArticlesPageNumber', () => {
    test('Should return part of state with view', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                page: 4,
            },
        };

        expect(getArticlesPageNumber(state as StateSchema)).toEqual(
            4,
        );
    });

    test('Should return 1 with empty state, because 1 it\'s default value', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticlesPageNumber(state as StateSchema)).toEqual(1);
    });
});
