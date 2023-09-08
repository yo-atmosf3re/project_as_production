import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import { Button } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import cls from './Sidebar.module.scss';

interface NavbarPropsI {
    className?: string;
}

export const Sidebar: React.FC<NavbarPropsI> = ({
    className,
}) => {
    const [collapsed, setCollapsed] = React.useState<boolean>(false);

    const onToggleHandler = () => {
        setCollapsed((prev) => !prev);
    };

    const { t } = useTranslation('sidebar');

    return (
        <div
            data-testid="sidebar"
            className={classNames(cls.sidebar, { [cls.collapsed]: !collapsed }, [className])}
        >
            <Button
                data-testid="sidebar-toggle"
                onClick={onToggleHandler}
            >
                {
                    t('Переключить')
                }
            </Button>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={cls.lang} />
            </div>
        </div>
    );
};
