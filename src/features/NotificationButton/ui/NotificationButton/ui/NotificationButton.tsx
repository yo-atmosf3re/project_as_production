import React, { useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Popover } from 'shared/ui/Popups';
import { NotificationList } from 'entities/Notification';
import { Button, BUTTON_THEME } from 'shared/ui/Button';
import { Icon } from 'shared/ui/Icon';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import { Drawer } from 'shared/ui/Drawer';
// ? С помощью библиотеки получаем простейший доступ к user agent, а благодаря импортированным обёрткам (для мобильной и десктопной версии) отрисовка для разных устройств упрощается;
import { BrowserView, MobileView } from 'react-device-detect';
// ? Можно использовать ленивую загрузку для мобильного и десктопного кода, потому что код для мобильной версии не нужен для десктопной и не подгружаться не будет и наоборот, что позволит сократить конечный размер бандла;
import cls from './NotificationButton.module.scss';

interface NotificationButtonPropsI {
    className?: string;
}

/**
 * Компонента, имплементирующая отрисовку `Popover`, содержащий уведомления (реализация сущности `NotificationI`). Может быть переиспользовано в любом месте проекта. Использует детекцию `user agent`, разделяя тем самым вёрстку на мобильную и десктопную;
 * @param className
 */
export const NotificationButton: React.FC<NotificationButtonPropsI> = ({
    className,
}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const trigger = (
        <Button
            theme={BUTTON_THEME.CLEAR}
            onClick={onOpenDrawer}
        >
            <Icon
                Svg={NotificationIcon}
                inverted
            />
        </Button>
    );

    return (
        <>
            <BrowserView>
                <Popover
                    className={classNames(cls['notification-button'], {}, [className])}
                    direction="bottom left"
                    trigger={trigger}
                >
                    <NotificationList
                        className={cls.notifications}
                    />
                </Popover>
            </BrowserView>
            <MobileView>
                {
                    trigger
                }
                <Drawer
                    isOpen={isOpen}
                    onClose={onCloseDrawer}
                >
                    <NotificationList />
                </Drawer>
            </MobileView>
        </>
    );
};
