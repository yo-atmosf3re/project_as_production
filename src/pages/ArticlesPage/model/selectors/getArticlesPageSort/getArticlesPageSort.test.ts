import { StateSchema } from 'app/providers/StoreProvider';
import { ARTICLE_SORT_FIELD } from 'entities/Article/model/types/article';
import { getArticlesPageSort } from './getArticlesPageSort';

describe('getArticlesPageSort', () => {
    test('Should return part of state with sort', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                sort: ARTICLE_SORT_FIELD.TITLE,
            },
        };

        expect(getArticlesPageSort(state as StateSchema)).toEqual(
            ARTICLE_SORT_FIELD.TITLE,
        );
    });

    test('Should return "createdAt" if state or selector\'s value is equal undefined', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticlesPageSort(state as StateSchema)).toEqual(
            ARTICLE_SORT_FIELD.CREATED,
        );
    });
});
