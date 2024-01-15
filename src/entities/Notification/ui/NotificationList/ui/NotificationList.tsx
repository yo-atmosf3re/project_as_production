import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { useNotifications } from '../../../api/notificationApi';
import cls from './NotificationList.module.scss';
import { NotificationItem } from '../../NotificationItem';

interface NotificationListPropsI {
    className?: string;
}

/**
 * Компонента, которая отрисовывает `NotificationItem`, то есть список уведомлений;
 * @param className
 */
export const NotificationList: React.FC<NotificationListPropsI> = ({
    className,
}) => {
    const { t } = useTranslation();

    const { data, isLoading } = useNotifications(null);

    return (
        <VStack
            gap="16"
            max
            className={classNames(cls['notification-list'], {}, [className])}
        >
            {
                data?.map((item) => (
                    <NotificationItem
                        key={item.id}
                        item={item}
                    />
                ))
            }
        </VStack>
    );
};
