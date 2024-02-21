import { StateSchema } from '@/app/providers/StoreProvider';
import { getArticleDetailsRecommendationsIsLoading } from './getArticleDetailsRecommendationsIsLoading';

describe('getArticleDetailsRecommendationsIsLoading', () => {
    test('Should return part of state with isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsPage: {
                recommendations: {
                    isLoading: true,
                },
            },
        };

        expect(getArticleDetailsRecommendationsIsLoading(state as StateSchema)).toEqual(
            true,
        );
    });

    test('Should return undefined with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticleDetailsRecommendationsIsLoading(state as StateSchema)).toEqual(undefined);
    });
});
