import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_LS_KEY } from '@/shared/const/localstorage';

// ? Создание RTK Query API;
export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: __API__,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(USER_LS_KEY) || '';
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
});
