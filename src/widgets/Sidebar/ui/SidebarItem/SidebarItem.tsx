import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { AppLink, APP_LINK_THEME } from '@/shared/ui/deprecated/AppLink';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/deprecated/Stack';

import cls from './SidebarItem.module.scss';
import { SidebarItemType } from '../../model/types/sidebar';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

/**
 * Один из элементов в сайдбаре, при нажатии на который можно перейти на определенную страницу;
 * @param item - элемент сайдбара;
 * @param collapsed - флаг свёрнутого состояния;
 */
export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation();
    const { Icon, path, text, authOnly } = item;

    const isAuth = useSelector(getUserAuthData);

    if (authOnly && !isAuth) {
        return null;
    }

    return (
        <AppLink
            theme={APP_LINK_THEME.SECONDARY}
            to={path}
            className={classNames(cls.item, { [cls.collapsed]: !collapsed })}
        >
            <HStack align="center">
                <Icon
                    className={cls.icon}
                    width={20}
                    height={20}
                />
                <span className={cls.link}>{t(text)}</span>
            </HStack>
        </AppLink>
    );
});
