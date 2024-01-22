import { StateSchema } from '@/app/providers/StoreProvider';
import { getArticlesPageHasMore } from './getArticlesPageHasMore';

describe('getArticlesPageHasMore', () => {
    test('Should return part of state with view', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                hasMore: true,
            },
        };

        expect(getArticlesPageHasMore(state as StateSchema)).toEqual(
            true,
        );
    });

    test('Should return undefined with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticlesPageHasMore(state as StateSchema)).toEqual(undefined);
    });
});
