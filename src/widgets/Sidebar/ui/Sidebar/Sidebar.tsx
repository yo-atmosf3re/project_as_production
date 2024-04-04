import React, { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LangSwitcher } from '@/features/LangSwitcher';
import {
    Button,
    BUTTON_THEME,
    BUTTON_SIZE,
} from '@/shared/ui/deprecated/Button';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { HStack, VStack } from '@/shared/ui/deprecated/Stack';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

interface NavbarPropsI {
    className?: string;
}

// ? Компонента-сайдбар, содержит некоторый функционал по пользовательской кастомизации приложения (смена темы, языка);
export const Sidebar: React.FC<NavbarPropsI> = memo(({ className }) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const sidebarItemsList = useSelector(getSidebarItems);

    console.log(collapsed);

    const onToggleHandler = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItem
                    item={item}
                    collapsed={collapsed}
                    key={item.path}
                />
            )),
        [collapsed, sidebarItemsList],
    );

    const deprecatedSidebar = (
        <aside
            data-testid="sidebar"
            className={classNames(
                cls.sidebar,
                { [cls.collapsed]: !collapsed },
                [className],
            )}
        >
            <Button
                data-testid="sidebar-toggle"
                onClick={onToggleHandler}
                className={cls['collapse-button']}
                theme={BUTTON_THEME.BACKGROUND_INVERTED}
                square
                size={BUTTON_SIZE.L}
            >
                {collapsed ? '>' : '<'}
            </Button>
            <VStack
                role="navigation"
                className={cls.items}
                gap="8"
            >
                {itemsList}
            </VStack>
            <HStack
                justify="center"
                className={cls.switchers}
            >
                <ThemeSwitcher />
                <LangSwitcher
                    className={cls.lang}
                    short={collapsed}
                />
            </HStack>
        </aside>
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <aside
                    data-testid="sidebar"
                    className={classNames(
                        cls['sidebar-redesigned'],
                        { [cls['collapsed-redesigned']]: collapsed },
                        [className],
                    )}
                >
                    <AppLogo
                        size={collapsed ? 27 : 230}
                        className={cls['app-logo']}
                    />
                    <VStack
                        role="navigation"
                        className={cls.items}
                        gap="8"
                    >
                        {itemsList}
                    </VStack>
                    <Icon
                        data-testid="sidebar-toggle"
                        onClick={onToggleHandler}
                        className={cls['collapse-button']}
                        Svg={ArrowIcon}
                        clickable
                    />
                    <HStack
                        justify="center"
                        className={cls.switchers}
                    >
                        <ThemeSwitcher />
                        <LangSwitcher
                            className={cls.lang}
                            short={!collapsed}
                        />
                    </HStack>
                </aside>
            }
            off={deprecatedSidebar}
        />
    );
});
