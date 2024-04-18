import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { useNotifications } from '../../../api/notificationApi';
import cls from './NotificationList.module.scss';
import { NotificationItem } from '../../NotificationItem';
import { toggleFeatures } from '@/shared/lib/features';

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
    const { data, isLoading } = useNotifications(null, {
        // ? Используя лонг-пуллинг, указываем интервал, по которому с периодичностью будут отправляться запросы на сервер за новыми уведомлениями;
        pollingInterval: 5000,
    });

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    if (isLoading) {
        return (
            <VStack
                gap="16"
                max
                className={classNames(cls['notification-list'], {}, [
                    className,
                ])}
            >
                <Skeleton
                    width="100%"
                    border="8px"
                    height="90px"
                    className={cls['skeleton-item']}
                />
                <Skeleton
                    width="100%"
                    border="8px"
                    height="90px"
                    className={cls['skeleton-item']}
                />
                <Skeleton
                    width="100%"
                    border="8px"
                    height="90px"
                    className={cls['skeleton-item']}
                />
            </VStack>
        );
    }

    return (
        <VStack
            gap="16"
            max
            className={classNames(cls['notification-list'], {}, [className])}
        >
            {data?.map((item) => (
                <NotificationItem
                    key={item.id}
                    item={item}
                />
            ))}
        </VStack>
    );
};
