import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    CARD_THEME,
    Card as CardDeprecated,
} from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { NotificationI } from '../../../model/types/notification';
import cls from './NotificationItem.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

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
    className,
    item,
}) => {
    const content = (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <CardDeprecated
                    theme={CARD_THEME.NORMAL}
                    className={classNames(cls['notification-item'], {}, [
                        className,
                    ])}
                >
                    <TextDeprecated
                        title={item.title}
                        text={item.description}
                    />
                </CardDeprecated>
            }
            on={
                <Card
                    className={classNames(cls['notification-item'], {}, [
                        className,
                    ])}
                >
                    <Text
                        title={item.title}
                        text={item.description}
                    />
                </Card>
            }
        />
    );

    if (item.href) {
        return (
            <a
                target="_blank"
                href={item.href}
                rel="noreferrer"
                className={cls.link}
            >
                {content}
            </a>
        );
    }

    return content;
};
