import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateFeatureFlagsMutation } from '../api/featuresFlagsApi';
import { ThunkConfigI } from '@/app/providers/StoreProvider';
import { FeatureFlagsI } from '@/shared/types/featureFlags';
import { getAllFeatureFlags } from '../lib/setGetFeatures';

interface UpdateFeatureFlagOptions {
    userId: string;
    newFeatures: Partial<FeatureFlagsI>;
}

export const updateFeatureFlag = createAsyncThunk<
    void,
    UpdateFeatureFlagOptions,
    ThunkConfigI<string>
>('user/saveJsonSettings', async ({ userId, newFeatures }, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
        await dispatch(
            updateFeatureFlagsMutation({
                userId,
                features: {
                    // ? Отправка всех фича-флагов на бекенд...;
                    ...getAllFeatureFlags(),
                    // ? ...с заменой тех, что мы отправляем;
                    ...newFeatures,
                },
            }),
        );
        
        // ? Перезагрузка страницы после обновления фичи на сервере;
        window.location.reload();
        return undefined;
    } catch (e) {
        console.log(e);
        return rejectWithValue('');
    }
});
