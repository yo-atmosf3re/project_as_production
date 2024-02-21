import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { CARD_THEME, Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { NotificationI } from '../../../model/types/notification';
import cls from './NotificationItem.module.scss';

interface NotificationItemPropsI {
    className?: string;
    item: NotificationI;
}

/**
 * Компонента, которая является уведомлением из массива с уведомлениями, который отрисовыывается в `NotificationList`;
 * @param className
 * @param item - элемент из массива с уведомлениями;
 */
export const NotificationItem: React.FC<NotificationItemPropsI> = ({
    className, item,
}) => {
    const content = (
        <Card
            theme={CARD_THEME.NORMAL}
            className={classNames(cls['notification-item'], {}, [className])}
        >
            <Text
                title={item.title}
                text={item.description}
            />
        </Card>
    );

    if (item.href) {
        return (
            <a
                target="_blank"
                href={item.href}
                rel="noreferrer"
                className={cls.link}
            >
                {
                    content
                }
            </a>
        );
    }

    return content;
};
