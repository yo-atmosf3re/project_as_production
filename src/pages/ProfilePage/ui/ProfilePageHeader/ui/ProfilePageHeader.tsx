import React, { Fragment, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Button } from 'shared/ui/Button';
import { Text } from 'shared/ui/Text';
import { BUTTON_THEME } from 'shared/ui/Button/ui/Button';
import { useSelector } from 'react-redux';
import { getProfileReadonly } from 'entitites/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { profileActions } from 'entitites/Profile/model/slice/profileSlice';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderPropsI {
    className?: string;
    isLoading?: boolean;
}

// ? Заголов карточки профиля, который содержит кнопку "Редактировать", "Изменить", "Отменить" и так далее;
export const ProfilePageHeader: React.FC<ProfilePageHeaderPropsI> = ({
    className, isLoading,
}) => {
    const { t } = useTranslation('profile');
    const { theme } = useTheme();
    const buttonClassCondition = theme === 'app_light_theme';
    const buttonThemeCondition = buttonClassCondition ? BUTTON_THEME.CLEAR : BUTTON_THEME.OUTLINE;
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const onEditHandler = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEditHandler = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSaveEditHandler = useCallback(() => {
        console.log('Some function, which should to save data');
    }, []);

    return (
        <div
            className={classNames(cls['profile-header'], {}, [className])}
        >
            <Text title={
                t('Профиль')
            }
            />
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
