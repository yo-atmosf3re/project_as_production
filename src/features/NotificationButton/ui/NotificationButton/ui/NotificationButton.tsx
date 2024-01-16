import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Popover } from 'shared/ui/Popups';
import { NotificationList } from 'entities/Notification';
import { Button, BUTTON_THEME } from 'shared/ui/Button';
import { Icon } from 'shared/ui/Icon';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import cls from './NotificationButton.module.scss';

interface NotificationButtonPropsI {
    className?: string;
}

/**
 * Компонента, имплементирующая отрисовку `Popover`, содержащий уведомления (реализация сущности `NotificationI`). Может быть переиспользовано в любом месте проекта;
 * @param className
 */
export const NotificationButton: React.FC<NotificationButtonPropsI> = ({
    className,
}) => {
    return (
        <Popover
            className={classNames(cls['notification-button'], {}, [className])}
            direction="bottom left"
            trigger={
                (
                    <Button
                        theme={BUTTON_THEME.CLEAR}
                    >
                        <Icon
                            Svg={NotificationIcon}
                            inverted
                        />
                    </Button>
                )
            }
        >
            <NotificationList
                className={cls.notifications}
            />
        </Popover>
    );
};
