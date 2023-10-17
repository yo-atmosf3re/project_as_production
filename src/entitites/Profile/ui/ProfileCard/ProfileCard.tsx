import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text';
import { Input } from 'shared/ui/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { TEXT_ALIGN, TEXT_THEME } from 'shared/ui/Text/ui/Text';
import {
    ProfileI,
} from '../../index';
import cls from './ProfileCard.module.scss';

interface ProfileCardPropsI {
    className?: string;
    data?: ProfileI;
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
    onChangeFirstnameHandler: (value?: string) => void;
    onChangeLastnameHandler: (value?: string) => void;
    onChangeCityHandler: (value?: string) => void;
    onChangeAgeHandler: (value?: string) => void;
}

export const ProfileCard: React.FC<ProfileCardPropsI > = ({
    className, data, error, isLoading, readonly,
    onChangeFirstnameHandler, onChangeLastnameHandler,
    onChangeAgeHandler, onChangeCityHandler,
}) => {
    const { t } = useTranslation('profile');

    if (isLoading) {
        return (
            <div
                className={classNames(
                    cls['profile-card'],
                    { [cls.loading]: true },
                    [className],
                )}
            >
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div
                className={classNames(
                    cls['profile-card'],
                    { },
                    [className, cls.error],
                )}
            >
                <Text
                    theme={TEXT_THEME.ERROR}
                    title={
                        t('Произошла ошибка при загрузке профиля')
                    }
                    text={
                        t('Попробуйте обновить страницу')
                    }
                    align={TEXT_ALIGN.CENTER}
                />
            </div>
        );
    }

    return (
        <div
            className={classNames(cls['profile-card'], { }, [className])}
        >
            <div
                className={cls.data}
            >
                <Input
                    value={data?.first}
                    onChange={onChangeFirstnameHandler}
                    placeholder={
                        t('Ваше имя')
                    }
                    readonly={readonly}
                    className={cls.input}
                />
                <Input
                    value={data?.lastname}
                    onChange={onChangeLastnameHandler}
                    placeholder={
                        t('Ваше фамилия')
                    }
                    readonly={readonly}
                    className={cls.input}
                />
                <Input
                    value={data?.age}
                    onChange={onChangeAgeHandler}
                    placeholder={
                        t('Возраст')
                    }
                    readonly={readonly}
                    className={cls.input}
                />
                <Input
                    value={data?.city}
                    onChange={onChangeCityHandler}
                    placeholder={
                        t('Город')
                    }
                    readonly={readonly}
                    className={cls.input}
                />
            </div>
        </div>
    );
};
