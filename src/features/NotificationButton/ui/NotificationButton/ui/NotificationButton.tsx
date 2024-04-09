import React, { useCallback } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { NotificationList } from '@/entities/Notification';
import {
    Button as ButtonDeprecated,
    BUTTON_THEME,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import NotificationIconDeprecated from '@/shared/assets/icons/notificationDeprecated.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import cls from './NotificationButton.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Icon
                    Svg={NotificationIcon}
                    clickable
                    onClick={onOpenDrawer}
                />
            }
            off={
                <ButtonDeprecated
                    theme={BUTTON_THEME.CLEAR}
                    onClick={onOpenDrawer}
                >
                    <IconDeprecated
                        Svg={NotificationIconDeprecated}
                        inverted
                        width={20}
                        height={20}
                    />
                </ButtonDeprecated>
            }
        />
    );

    return (
        <>
            <BrowserView>
                <PopoverDeprecated
                    className={classNames(cls['notification-button'], {}, [
                        className,
                    ])}
                    direction="bottom left"
                    trigger={trigger}
                >
                    <NotificationList className={cls.notifications} />
                </PopoverDeprecated>
            </BrowserView>
            <MobileView>
                {trigger}
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
