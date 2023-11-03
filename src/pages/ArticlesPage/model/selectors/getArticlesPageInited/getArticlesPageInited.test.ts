import { StateSchema } from 'app/providers/StoreProvider';
import { getArticlesPageInited } from './getArticlesPageInited';

describe('getArticlesPageInited', () => {
    test('Should return part of state with _inited', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                _inited: false,
            },
        };

        expect(getArticlesPageInited(state as StateSchema)).toEqual(
            false,
        );
    });

    test('Should return undefined with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticlesPageInited(state as StateSchema)).toEqual(undefined);
    });
});
