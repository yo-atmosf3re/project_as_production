import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import cls from './AdminPanelPage.module.scss';

interface AdminPanelPagePropsI {
    className?: string;
}

/**
 *  Страница, которая отрисовывает админ-панель;
 * @param className
 */
const AdminPanelPage: React.FC<AdminPanelPagePropsI> = ({
    className,
}) => {
    const { t } = useTranslation('adminPanel');

    return (
        <Page
            className={classNames(cls['admin-panel'], {}, [className])}
        >
            {
                t(
                    'Админ панель',
                )
            }
        </Page>
    );
};

export default AdminPanelPage;
