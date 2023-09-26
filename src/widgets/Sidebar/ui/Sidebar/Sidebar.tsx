import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import { Button } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { BUTTON_THEME, BUTTON_SIZE } from 'shared/ui/Button/ui/Button';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { ROUTES_PATH } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-us.svg';
import MainIcon from 'shared/assets/icons/main.svg';
import cls from './Sidebar.module.scss';

interface NavbarPropsI {
    className?: string;
}

// ? Компонента-сайдбар, содержит некоторый функционал по пользовательской кастомизации приложения (смена темы, языка);
export const Sidebar: React.FC<NavbarPropsI> = ({
    className,
}) => {
    const [collapsed, setCollapsed] = React.useState<boolean>(false);

    const onToggleHandler = () => {
        setCollapsed((prev) => !prev);
    };

    // eslint-disable-next-line no-unused-vars
    const { t } = useTranslation('sidebar');

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
                <div className={cls.item}>
                    <MainIcon className={cls.icon} />
                    <AppLink
                        theme={AppLinkTheme.SECONDARY}
                        to={ROUTES_PATH.main}
                        className={cls.link}
                    >
                        {
                            t('Главная страница')
                        }
                    </AppLink>
                </div>
                <div className={cls.item}>
                    <AboutIcon className={cls.icon} />
                    <AppLink
                        theme={AppLinkTheme.SECONDARY}
                        to={ROUTES_PATH.about}
                        className={cls.link}
                    >
                        {
                            t('О сайте')
                        }
                    </AppLink>
                </div>
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
};
