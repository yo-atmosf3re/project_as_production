import { StateSchema } from 'app/providers/StoreProvider';
import { ARTICLE_TYPE } from 'entities/Article';
import { getArticlesPageType } from './getArticlesPageType';

describe('getArticlesPageType', () => {
    test('Should return part of state with type', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                type: ARTICLE_TYPE.ECONOMICS,
            },
        };

        expect(getArticlesPageType(state as StateSchema)).toEqual(
            ARTICLE_TYPE.ECONOMICS,
        );
    });

    test('Should return "all" if state or selector\'s value is equal undefined', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticlesPageType(state as StateSchema)).toEqual(
            'all',
        );
    });
});
