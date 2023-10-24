import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Button, BUTTON_THEME } from 'shared/ui/Button';
import { TEXT_THEME, Text } from 'shared/ui/Text';
import { useSelector } from 'react-redux';
import { getProfileReadonly, updateProfileData } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { profileActions } from 'entities/Profile/model/slice/profileSlice';
import { VALIDATE_PROFILE_ERROR } from 'entities/Profile/model/types/profile';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderPropsI {
    className?: string;
    isLoading?: boolean;
    validateErrors?: VALIDATE_PROFILE_ERROR[];
}

// ? Заголов карточки профиля, который содержит кнопку "Редактировать", "Изменить", "Отменить" и так далее;
export const ProfilePageHeader: React.FC<ProfilePageHeaderPropsI> = ({
    className, isLoading,
    validateErrors,
}) => {
    const { t } = useTranslation('profile');
    const { theme } = useTheme();
    const buttonClassCondition = theme === 'app_light_theme';
    const buttonThemeCondition = buttonClassCondition ? BUTTON_THEME.CLEAR : BUTTON_THEME.OUTLINE;
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const validateErrorTranslates = {
        [VALIDATE_PROFILE_ERROR.INCORRECT_AGE]: t('Некорректный возраст'),
        [VALIDATE_PROFILE_ERROR.INCORRECT_COUNTRY]: t('Некорректный регион'),
        [VALIDATE_PROFILE_ERROR.INCORRECT_USER_DATA]: t('Некорректные данные пользователя. Имя и фамилия обязательны!'),
        [VALIDATE_PROFILE_ERROR.NO_DATA]: t('Данные не указаны'),
        [VALIDATE_PROFILE_ERROR.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
    };

    const onEditHandler = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEditHandler = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSaveEditHandler = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <div
            className={classNames(cls['profile-header'], {}, [className])}
        >
            <div
                className={cls['profile-info']}
            >
                <Text title={
                    t('Профиль')
                }
                />
                {
                    validateErrorTranslates && validateErrors?.length
                        ? (
                            <div
                                className={cls['errors-card']}
                            >
                                {
                                    validateErrors.map(
                                        (error) => (
                                            <Text
                                                key={`${error}-${(Math.random()).toString().replace('.', '')}`}
                                                theme={TEXT_THEME.ERROR}
                                                // ? Обращаемся к объекту validateErrorTranslates по ключу, ключом будет являться error. Ключи validateErrorTranslates и ключи error идентичны, поэтому вернётся сопоставимое по ключу значение, а значением будет являться перевод;
                                                text={validateErrorTranslates[error]}
                                            />
                                        ),
                                    )
                                }
                            </div>
                        )
                        : null
                }
            </div>
            {
                readonly
                    ? (
                        <Button
                            className={
                                classNames(cls['edit-button'], { [cls['light-button']]: buttonClassCondition }, [])
                            }
                            theme={buttonThemeCondition}
                            onClick={onEditHandler}
                            disabled={isLoading}
                        >
                            {
                                t('Редактировать')
                            }
                        </Button>
                    )
                    : (
                        <div
                            className={cls.buttons}
                        >
                            <Button
                                className={
                                    classNames(
                                        cls['some-button'],
                                        { [cls['cancel-light']]: buttonClassCondition },
                                        [],
                                    )
                                }
                                theme={BUTTON_THEME.OUTLINE_RED}
                                onClick={onCancelEditHandler}
                                disabled={isLoading}
                            >
                                {
                                    t('Отменить')
                                }
                            </Button>
                            <Button
                                className={
                                    classNames(
                                        cls['edit-button'],
                                        { [cls['light-button']]: buttonClassCondition },
                                        [],
                                    )
                                }
                                theme={buttonThemeCondition}
                                onClick={onSaveEditHandler}
                                disabled={isLoading}
                            >
                                {
                                    t('Сохранить')
                                }
                            </Button>
                        </div>
                    )
            }
        </div>
    );
};

// {
//     validateErrorTranslates && validateErrors?.length
//         ? validateErrors.map(
//             (error) => (
//                 <Text
//                     key={`${error}-${(Math.random()).toString().replace('.', '')}`}
//                     theme={TEXT_THEME.ERROR}
//                     // ? Обращаемся к объекту validateErrorTranslates по ключу, ключом будет являться error. Ключи validateErrorTranslates и ключи error идентичны, поэтому вернётся сопоставимое по ключу значение, а значением будет являться перевод;
//                     text={validateErrorTranslates[error]}
//                 />
//             ),
//         )
//         : null
// }
