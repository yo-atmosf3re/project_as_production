import { StateSchema } from '@/app/providers/StoreProvider';
import { getArticleCommentsIsLoading } from './getArticleCommentsIsLoading';

describe('getArticleCommentsIsLoading', () => {
    test('Should return part of state with isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsPage: {
                comments: {
                    isLoading: true,
                },
            },
        };

        expect(getArticleCommentsIsLoading(state as StateSchema)).toEqual(true);
    });

    test('Should return undefined with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticleCommentsIsLoading(state as StateSchema)).toEqual(
            undefined,
        );
    });
});
