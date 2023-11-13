import { StateSchema } from 'app/providers/StoreProvider';

export const
    getArticleDetailsRecommendationsIsLoading = (state: StateSchema) => state
        .articleDetailsPageRecommendations?.isLoading;
