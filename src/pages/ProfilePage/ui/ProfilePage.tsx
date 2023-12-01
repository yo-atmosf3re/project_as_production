import React, { useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    ProfileCard, fetchProfileData,
    getProfileError, getProfileForm, getProfileIsLoading, getProfileReadonly, getProfileValidateErrors, profileReducer,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { profileActions } from 'entities/Profile/model/slice/profileSlice';
import { CURRENCY } from 'entities/Currency';
import { COUNTRY } from 'entities/Country';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useParams } from 'react-router-dom';
import { Page } from 'widgets/Page';
import cls from './ProfilePage.module.scss';
import { ProfilePageHeader } from './ProfilePageHeader';

interface ProfilePagePropsI {
    className?: string;
}

const INITIAL_REDUCERS: ReducersList = {
    profile: profileReducer,
};

/**
 * Содержит в себе отрисовку страницы профиля: карточки пользователя/пользователей, заголовок страницы, логику по взаимодействию пользователя со страницей профиля;
 * @param className
 */
const ProfilePage: React.FC<ProfilePagePropsI> = ({
    className,
}) => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{id: string}>();
    // ? Получаем дублированные данные из стейта, изменяем и работаем уже дальше с ними, а если нужно вернуть вводимые значения к дефолтным - это легко происходит в экшене cancelEdit, который активируется в ProfilePageHeader в обработчике событий;
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    });

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

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            username: value || '',
        }));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            avatar: value || '',
        }));
    }, [dispatch]);

    const onChangeCurrency = useCallback((currency: CURRENCY) => {
        dispatch(profileActions.updateProfile({ currency }));
    }, [dispatch]);

    const onChangeCountry = useCallback((country: COUNTRY) => {
        dispatch(profileActions.updateProfile({ country }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader
            reducers={INITIAL_REDUCERS}
        >
            <Page className={classNames(cls.profile, {}, [className])}>
                <ProfilePageHeader
                    isLoading={isLoading}
                    validateErrors={validateErrors}
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
                    onChangeUsernameHandler={onChangeUsername}
                    onChangeAvatarHandler={onChangeAvatar}
                    onChangeCurrencyHandler={onChangeCurrency}
                    onChangeCountryHandler={onChangeCountry}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
