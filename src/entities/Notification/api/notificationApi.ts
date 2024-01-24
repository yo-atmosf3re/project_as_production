import { rtkApi } from '@/shared/api/rtkApi';
import { NotificationI } from '../model/types/notification';

/**
 * Редьюсер для получения уведомлений;
 */
const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<NotificationI[], null>({
            query: () => ({
                url: '/notifications',
            }),
        }),
    }),
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
