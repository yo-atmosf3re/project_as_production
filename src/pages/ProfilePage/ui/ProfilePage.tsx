import React, { useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    ProfileCard, fetchProfileData,
    getProfileError, getProfileForm, getProfileIsLoading, getProfileReadonly, profileReducer,
} from 'entitites/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { profileActions } from 'entitites/Profile/model/slice/profileSlice';
import cls from './ProfilePage.module.scss';
import { ProfilePageHeader } from './ProfilePageHeader';

interface ProfilePagePropsI {
    className?: string;
}

const INITIAL_REDUCERS: ReducersList = {
    profile: profileReducer,
};

// ? Содержит в себе отрисовку страницы профиля: карточки пользователя/пользователей, заголовок страницы, логику по взаимодействию пользователя со страницей профиля;
const ProfilePage: React.FC<ProfilePagePropsI> = ({
    className,
}) => {
    const dispatch = useAppDispatch();
    // ? Получаем дублированные данные из стейта, изменяем и работаем уже дальше с ними, а если нужно вернуть вводимые значения к дефолтным - это легко происходит в экшене cancelEdit, который активируется в ProfilePageHeader в обработчике событий;
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            first: value || '',
        }));
    }, [dispatch]);

    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            lastname: value || '',
        }));
    }, [dispatch]);

    const onChangeAge = useCallback((value?: string) => {
        // ? Regex отрабатывает только на цифрах;
        const regex = /^\d*$/;
        // ? Если условие не выполняется, то и в инпут в итоге ничего не попадает;
        if (regex.test(value || '')) {
            dispatch(profileActions.updateProfile({
                age: Number(value || 0),
            }));
        }
    }, [dispatch]);

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            city: value || '',
        }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={INITIAL_REDUCERS}
        >
            <div className={classNames(cls.profile, {}, [className])}>
                <ProfilePageHeader
                    isLoading={isLoading}
                />
                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readonly={readonly}
                    onChangeFirstnameHandler={onChangeFirstname}
                    onChangeLastnameHandler={onChangeLastname}
                    onChangeAgeHandler={onChangeAge}
                    onChangeCityHandler={onChangeCity}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
