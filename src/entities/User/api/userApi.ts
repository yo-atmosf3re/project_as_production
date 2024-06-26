import { rtkApi } from '@/shared/api/rtkApi';
import { UserI } from '../models/types/user';
import { JsonSettingsI } from '../models/types/jsonSettings';

interface SetJsonSettingsArg {
    userId: string;
    jsonSettings: JsonSettingsI;
}

/**
 * Апи для изменения jsonSettings у конкретного пользователя;
 */
const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        setJsonSettings: build.mutation<UserI, SetJsonSettingsArg>({
            query: ({
                userId, jsonSettings
            }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    jsonSettings
                }
            }),
        }),
        getUserDataById: build.query<UserI, string>({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'GET',
            }),
        }),
    }),
});

/**
 * Метод, позволяющий работать с `userApi` без хука в async thunk'e;
 */
export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;