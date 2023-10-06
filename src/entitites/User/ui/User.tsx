import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './User.module.scss';

interface UserPropsI {
    className?: string;
}

export const User: React.FC<UserPropsI> = ({
    className,
}) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.user, {}, [className])}>
            {
                t('Пользователь')
            }
        </div>
    );
};
