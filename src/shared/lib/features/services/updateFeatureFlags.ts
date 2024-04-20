import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateFeatureFlagsMutation } from '../api/featuresFlagsApi';
import { ThunkConfigI } from '@/app/providers/StoreProvider';
import { FeatureFlagsI } from '@/shared/types/featureFlags';
import { getAllFeatureFlags, setFeatureFlags } from '../lib/setGetFeatures';

interface UpdateFeatureFlagOptions {
    userId: string;
    newFeatures: Partial<FeatureFlagsI>;
}

export const updateFeatureFlag = createAsyncThunk<
    void,
    UpdateFeatureFlagOptions,
    ThunkConfigI<string>
>('features/updateFeatureFlag', async ({ userId, newFeatures }, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    const allFeatures = {
                    ...getAllFeatureFlags(),
                    ...newFeatures,
    }

    try {
        await dispatch(
            updateFeatureFlagsMutation({
                userId,
                // ? Отправка всех фича-флагов на бекенд...;
                // ? ...с заменой тех, что мы отправляем;
                features: allFeatures,
            }),
        );

        setFeatureFlags(
            allFeatures
        )

        window.location.reload();
        
        return undefined;
    } catch (e) {
        console.log(e);
        return rejectWithValue('');
    }
});
