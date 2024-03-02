import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Button, BUTTON_THEME } from '@/shared/ui/Button';
import { TEXT_THEME, Text } from '@/shared/ui/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/Stack';
import { VALIDATE_PROFILE_ERROR } from '@/shared/const/consts';
import { updateProfileData } from '../../models/services/updateProfileData/updateProfileData';
import { profileActions } from '../../models/slice/profileSlice';
import { getProfileData } from '../../models/selectors/getProfileData/getProfileData';
import { getProfileIsLoading } from '../../models/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../models/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../models/selectors/getProfileValidateErrors/getProfileValidateErrors';
import cls from './EditableProfilePageHeader.module.scss';

interface ProfilePageHeaderPropsI {
    className?: string;
}

// ? Заголов карточки профиля, который содержит кнопку "Редактировать", "Изменить", "Отменить" и так далее;
export const EditableProfilePageHeader: React.FC<ProfilePageHeaderPropsI> = ({
    className,
}) => {
    const { t } = useTranslation('profile');
    const { theme } = useTheme();
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getProfileIsLoading);
    const validateErrors = useSelector(getProfileValidateErrors);

    const buttonClassCondition = theme === 'app_light_theme';
    const buttonThemeCondition = buttonClassCondition
        ? BUTTON_THEME.CLEAR
        : BUTTON_THEME.OUTLINE;
    // ? Если id пользователя не равен id просматриваемого пользователя, то редактирование профиля будет недоступно;
    const canEdit = authData?.id === profileData?.id;

    const validateErrorTranslates = {
        [VALIDATE_PROFILE_ERROR.INCORRECT_AGE]: t('Некорректный возраст'),
        [VALIDATE_PROFILE_ERROR.INCORRECT_COUNTRY]: t('Некорректный регион'),
        [VALIDATE_PROFILE_ERROR.INCORRECT_USER_DATA]: t(
            'Некорректные данные пользователя. Имя и фамилия обязательны!',
        ),
        [VALIDATE_PROFILE_ERROR.NO_DATA]: t('Данные не указаны'),
        [VALIDATE_PROFILE_ERROR.SERVER_ERROR]: t(
            'Серверная ошибка при сохранении',
        ),
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
        <HStack
            max
            justify="between"
            className={classNames(cls['profile-header'], {}, [className])}
        >
            <>
                <Text title={t('Профиль')} />
                {validateErrorTranslates && validateErrors?.length ? (
                    <div className={cls['errors-card']}>
                        {validateErrors.map((error) => (
                            <Text
                                key={`${error}-${Math.random()
                                    .toString()
                                    .replace('.', '')}`}
                                theme={TEXT_THEME.ERROR}
                                // ? Обращаемся к объекту validateErrorTranslates по ключу, ключом будет являться error. Ключи validateErrorTranslates и ключи error идентичны, поэтому вернётся сопоставимое по ключу значение, а значением будет являться перевод;
                                text={validateErrorTranslates[error]}
                                data-testid="EditableProfilePageHeader.Error"
                            />
                        ))}
                    </div>
                ) : null}
            </>
            {canEdit && (
                <div className={cls.buttons}>
                    {readonly ? (
                        <Button
                            className={classNames(
                                cls['edit-button'],
                                { [cls['light-button']]: buttonClassCondition },
                                [],
                            )}
                            theme={buttonThemeCondition}
                            onClick={onEditHandler}
                            disabled={isLoading}
                            data-testid="EditableProfilePageHeader.EditButton"
                        >
                            {t('Редактировать')}
                        </Button>
                    ) : (
                        <HStack gap="8">
                            <Button
                                className={classNames(
                                    cls['some-button'],
                                    {
                                        [cls['cancel-light']]:
                                            buttonClassCondition,
                                    },
                                    [],
                                )}
                                theme={BUTTON_THEME.OUTLINE_RED}
                                onClick={onCancelEditHandler}
                                disabled={isLoading}
                                data-testid="EditableProfilePageHeader.CancelButton"
                            >
                                {t('Отменить')}
                            </Button>
                            <Button
                                className={classNames(
                                    cls['edit-button'],
                                    {
                                        [cls['light-button']]:
                                            buttonClassCondition,
                                    },
                                    [],
                                )}
                                theme={buttonThemeCondition}
                                onClick={onSaveEditHandler}
                                disabled={isLoading}
                                data-testid="EditableProfilePageHeader.SaveButton"
                            >
                                {t('Сохранить')}
                            </Button>
                        </HStack>
                    )}
                </div>
            )}
        </HStack>
    );
};
