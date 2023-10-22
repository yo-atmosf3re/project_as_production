import { useTranslation } from 'react-i18next';
import { AppLink, APP_LINK_THEME } from 'shared/ui/AppLink/AppLink';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { getUserAuthData } from 'entitites/User';
import { useSelector } from 'react-redux';
import cls from './SidebarItem.module.scss';
import { SidebarItemType } from '../../model/sidebarItems';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

// ? Один из элементов в сайдбаре, при нажатии на который можно перейти на определенную страницу;
export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation();
    const { Icon, path, text } = item;

    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <AppLink
            theme={APP_LINK_THEME.SECONDARY}
            to={path}
            className={classNames(cls.item, { [cls.collapsed]: !collapsed })}
        >
            <Icon
                className={cls.icon}
            />
            <span
                className={cls.link}
            >
                {
                    t(text)
                }
            </span>
        </AppLink>
    );
});