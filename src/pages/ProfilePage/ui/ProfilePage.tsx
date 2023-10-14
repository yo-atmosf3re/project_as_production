import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfilePage.module.scss';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer } from 'entitites/Profile';

interface ProfilePagePropsI {
    className?: string;
}

const INITIAL_REDUCERS: ReducersList = {
    profile: profileReducer
}

const ProfilePage: React.FC<ProfilePagePropsI> = ({
    className
}) => {
    const { t } = useTranslation();
    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={INITIAL_REDUCERS}
        >
            <div className={classNames(cls.profile, {}, [className])}>
                {
                    t('Profile page')
                }
            </div>
        </DynamicModuleLoader>
    )
}

export default ProfilePage