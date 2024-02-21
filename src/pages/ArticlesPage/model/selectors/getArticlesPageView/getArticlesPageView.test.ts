import { StateSchema } from '@/app/providers/StoreProvider';
import { ARTICLE_VIEW } from '@/shared/const/consts';
import { getArticlesPageView } from './getArticlesPageView';

describe('getArticlesPageView', () => {
    test('Should return part of state with view', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                view: ARTICLE_VIEW.SMALL,
            },
        };

        expect(getArticlesPageView(state as StateSchema)).toEqual(
            'SMALL',
        );
    });

    test('Should return default value with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticlesPageView(state as StateSchema)).toEqual(
            'SMALL',
        );
    });
});
