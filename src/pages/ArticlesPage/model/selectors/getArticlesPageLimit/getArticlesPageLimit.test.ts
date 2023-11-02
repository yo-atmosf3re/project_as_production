import { StateSchema } from 'app/providers/StoreProvider';
import { getArticlesPageLimit } from './getArticlesPageLimit';

describe('getArticlesPageLimit', () => {
    test('Should return part of state with view', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                limit: 12,
            },
        };

        expect(getArticlesPageLimit(state as StateSchema)).toEqual(
            12,
        );
    });

    test('Should return 9 with empty state, because 9 it\'s default value', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticlesPageLimit(state as StateSchema)).toEqual(9);
    });
});
