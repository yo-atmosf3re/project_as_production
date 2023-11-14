import { StateSchema } from 'app/providers/StoreProvider';
import { getArticleDetailsRecommendationsError } from './getArticleDetailsRecommendationsError';

describe('getArticleDetailsReccomendationsError', () => {
    test('Should return part of state with error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsPage: {
                recommendations: {
                    error: 'Error',
                },
            },
        };

        expect(getArticleDetailsRecommendationsError(state as StateSchema)).toEqual(
            'Error',
        );
    });

    test('Should return undefined with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticleDetailsRecommendationsError(state as StateSchema)).toEqual(undefined);
    });
});
