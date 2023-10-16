import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { Text } from 'shared/ui/Text';
import { Button } from 'shared/ui/Button';
import { BUTTON_THEME } from 'shared/ui/Button/ui/Button';
import { Input } from 'shared/ui/Input';
import { useTheme } from 'app/providers/ThemeProvider';
import { getProfileData, getProfileError, getProfileIsLoading } from '../../index';
import cls from './ProfileCard.module.scss';

interface ProfileCardPropsI {
    className?: string;
}

export const ProfileCard: React.FC<ProfileCardPropsI > = ({
    className,
}) => {
    const { t } = useTranslation('profile');
    const data = useSelector(getProfileData);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const { theme } = useTheme();
    const buttonClassCondition = theme === 'app_light_theme';
    const buttonThemeCondition = buttonClassCondition ? BUTTON_THEME.CLEAR : BUTTON_THEME.OUTLINE;
    console.log(buttonClassCondition, 'Class button');

    console.log(classNames(cls['profile-card']), 'CLASS NAMES');
    return (
        <div
            className={classNames(cls['profile-card'], { }, [className])}
        >
            <div
                className={cls.header}
            >
                <Text title={
                    t('Профиль')
                }
                />
                <Button
                    className={classNames(cls['edit-button'], { [cls['light-button']]: buttonClassCondition }, [])}
                    theme={buttonThemeCondition}
                >
                    {
                        t('Редактировать')
                    }
                </Button>
            </div>
            <div
                className={cls.data}
            >
                <Input
                    value={data?.first}
                    placeholder={
                        t('Ваше имя')
                    }
                    className={cls.input}
                />
                <Input
                    value={data?.lastname}
                    placeholder={
                        t('Ваше фамилия')
                    }
                    className={cls.input}
                />
            </div>
        </div>
    );
};
