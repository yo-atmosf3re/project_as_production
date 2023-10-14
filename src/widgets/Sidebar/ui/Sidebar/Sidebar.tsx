import React, { memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import { Button } from 'shared/ui/Button';
import { BUTTON_THEME, BUTTON_SIZE } from 'shared/ui/Button/ui/Button';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { SidebarItemsList } from '../../model/items';

interface NavbarPropsI {
    className?: string;
}

// ? Компонента-сайдбар, содержит некоторый функционал по пользовательской кастомизации приложения (смена темы, языка);
export const Sidebar: React.FC<NavbarPropsI> = memo(({
    className,
}) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const onToggleHandler = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div
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
            <div className={cls.items}>
                {
                    SidebarItemsList.map((item) => (
                        <SidebarItem
                            item={item}
                            collapsed={collapsed}
                            key={item.path}
                        />
                    ))
                }
            </div>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher
                    className={cls.lang}
                    short={collapsed}
                />
            </div>
        </div>
    );
});
