import React, { memo, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import { Button, BUTTON_THEME, BUTTON_SIZE } from 'shared/ui/Button';
import { useSelector } from 'react-redux';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { VStack } from 'shared/ui/Stack';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';

interface NavbarPropsI {
    className?: string;
}

// ? Компонента-сайдбар, содержит некоторый функционал по пользовательской кастомизации приложения (смена темы, языка);
export const Sidebar: React.FC<NavbarPropsI> = memo(({
    className,
}) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const sidebarItemsList = useSelector(getSidebarItems);

    const onToggleHandler = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(() => sidebarItemsList.map((item) => (
        <SidebarItem
            item={item}
            collapsed={collapsed}
            key={item.path}
        />
    )), [collapsed, sidebarItemsList]);

    return (
        <menu
            data-testid="sidebar"
            className={classNames(cls.sidebar, { [cls.collapsed]: !collapsed }, [className])}
        >
            <Button
                data-testid="sidebar-toggle"
                onClick={onToggleHandler}
                className={cls['collapse-button']}
                theme={BUTTON_THEME.BACKGROUND_INVERTED}
                square
                size={BUTTON_SIZE.L}
            >
                {
                    collapsed ? '>' : '<'
                }
            </Button>
            <VStack
                className={cls.items}
                gap="8"
            >
                {
                    itemsList
                }
            </VStack>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher
                    className={cls.lang}
                    short={collapsed}
                />
            </div>
        </menu>
    );
});
