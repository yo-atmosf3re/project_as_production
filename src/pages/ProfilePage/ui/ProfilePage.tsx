import React, { useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ProfileCard, fetchProfileData, profileReducer } from 'entitites/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './ProfilePage.module.scss';

interface ProfilePagePropsI {
    className?: string;
}

const INITIAL_REDUCERS: ReducersList = {
    profile: profileReducer,
};

const ProfilePage: React.FC<ProfilePagePropsI> = ({
    className,
}) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={INITIAL_REDUCERS}
        >
            <div className={classNames(cls.profile, {}, [className])}>
                <ProfileCard />
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
