import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AdminPanelPage.module.scss';

interface AdminPanelPagePropsI {
    className?: string;
}

/**
 *
 * @param className
 */
const AdminPanelPage: React.FC<AdminPanelPagePropsI> = ({
    className,
}) => {
    const { t } = useTranslation('adminPanel');

    return (
        <div
            className={classNames(cls['admin-panel'], {}, [className])}
        >
            {
                t(
                    'Админ панель',
                )
            }
        </div>
    );
};

export default AdminPanelPage;
