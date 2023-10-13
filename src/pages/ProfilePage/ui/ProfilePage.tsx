import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfilePage.module.scss';
import { useTranslation } from 'react-i18next';

interface ProfilePagePropsI {
    className?: string;
}

const ProfilePage: React.FC<ProfilePagePropsI> = ({
    className
}) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.profile, {}, [className])}>
            {
                t('Profile page')
            }
        </div>
    )
}

export default ProfilePage