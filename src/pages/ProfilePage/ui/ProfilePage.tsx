import React, { useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    ProfileCard, fetchProfileData,
    getProfileError, getProfileForm, getProfileIsLoading, getProfileReadonly, getProfileValidateErrors, profileReducer,
} from 'entitites/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { profileActions } from 'entitites/Profile/model/slice/profileSlice';
import { CURRENCY } from 'entitites/Currency';
import { COUNTRY } from 'entitites/Country';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();
    // ? Получаем дублированные данные из стейта, изменяем и работаем уже дальше с ними, а если нужно вернуть вводимые значения к дефолтным - это легко происходит в экшене cancelEdit, который активируется в ProfilePageHeader в обработчике событий;
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);

    // const validateErrorTranslates = {
    //     [VALIDATE_PROFILE_ERROR.INCORRECT_AGE]: t('Некорректный возраст'),
    //     [VALIDATE_PROFILE_ERROR.INCORRECT_COUNTRY]: t('Некорректный регион'),
    //     [VALIDATE_PROFILE_ERROR.INCORRECT_USER_DATA]: t('Некорректные данные пользователя. Имя и фамилия обязательны!'),
    //     [VALIDATE_PROFILE_ERROR.NO_DATA]: t('Данные не указаны'),
    //     [VALIDATE_PROFILE_ERROR.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
    // };

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchProfileData());
        }
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
            removeAfterUnmount
            reducers={INITIAL_REDUCERS}
        >
            <div className={classNames(cls.profile, {}, [className])}>
                <ProfilePageHeader
                    isLoading={isLoading}
                    validateErrors={validateErrors}
                />
                {
                    // validateErrors?.length
                    //     ? validateErrors.map(
                    //         (error) => (
                    //             <Text
                    //                 key={`${error}-${(Math.random()).toString().replace('.', '')}`}
                    //                 theme={TEXT_THEME.ERROR}
                    //                 // ? Обращаемся к объекту validateErrorTranslates по ключу, ключом будет являться error. Ключи validateErrorTranslates и ключи error идентичны, поэтому вернётся сопоставимое по ключу значение, а значением будет являться перевод;
                    //                 text={validateErrorTranslates[error]}
                    //             />
                    //         ),
                    //     )
                    //     : null
                }
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
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
