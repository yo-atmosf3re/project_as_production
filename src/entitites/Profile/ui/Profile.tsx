import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Profile.module.scss';

interface ProfilePropsI {
    className ?: string;
}

export const Profile: React.FC < ProfilePropsI > = ({
    className,
}) => {
    const { t } = useTranslation();
    return (
        <div
            className={classNames(cls.Profile, {}, [className])}
        >
            {
                t('Profile')
            }
        </div>
    );
};
