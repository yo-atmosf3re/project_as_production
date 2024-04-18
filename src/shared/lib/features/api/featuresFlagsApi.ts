import { rtkApi } from '@/shared/api/rtkApi';
import { FeatureFlagsI } from '@/shared/types/featureFlags';

interface UpdateFeaturesFlagsOptionsI {
    userId: string;
    // ? Добавлен Partial для возможности обновления не всех фичей, а лишь частично;
    features: Partial<FeatureFlagsI>;
}

/**
 * Апи для изменения jsonSettings у конкретного пользователя;
 */
const featureFlagsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        updateFeaturesFlags: build.mutation<void, UpdateFeaturesFlagsOptionsI>({
            query: ({
                userId, features
            }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    features
                }
            }),
        }),
    }),
});

/**
 * Метод, позволяющий работать с `userApi` без хука в async thunk'e;
 */
export const updateFeatureFlagsMutation = featureFlagsApi.endpoints.updateFeaturesFlags.initiate
