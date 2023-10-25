import { StateSchema } from 'app/providers/StoreProvider';
import { getArticleCommentsError } from './getArticleCommentsError';

describe('getArticleCommentsError', () => {
    test('Should return part of state with error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsComments: {
                error: 'Error',
            },
        };

        expect(getArticleCommentsError(state as StateSchema)).toEqual(
            'Error',
        );
    });

    test('Should return undefined with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticleCommentsError(state as StateSchema)).toEqual(undefined);
    });
});
