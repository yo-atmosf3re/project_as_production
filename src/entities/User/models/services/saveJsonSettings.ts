import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigI } from '@/app/providers/StoreProvider';
import { JsonSettingsI } from '../types/jsonSettings';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/jsonSettings/jsonSettings';
import { setJsonSettingsMutation } from '../../api/userApi';

/**
 * Сохранение `jsonSettings` для конкретного пользователя;
 * @param id - айди, по которому будет осуществляться поиск нужной статьи;
 */
export const saveJsonSettings = createAsyncThunk<
    JsonSettingsI,
    JsonSettingsI,
    ThunkConfigI<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkApi) => {
    const {  rejectWithValue, getState, dispatch } = thunkApi;

    const userData = getUserAuthData(getState());
    const currentSettings = getJsonSettings(getState());

    if(!userData) return rejectWithValue('');

    try {

        const response = await dispatch(
            setJsonSettingsMutation(
                {
                    userId: userData.id,
                    jsonSettings: {
                        ...currentSettings,
                        ...newJsonSettings
                    }
                }
            )
        ).unwrap();

        if(!response.jsonSettings) return rejectWithValue('');

        return response.jsonSettings;
        
    } catch (error) {
        console.log(error);
        return rejectWithValue('');
    }
});
