import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text';
import { Input } from 'shared/ui/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { TEXT_ALIGN, TEXT_THEME } from 'shared/ui/Text/ui/Text';
import { Avatar } from 'shared/ui/Avatar';
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
    // ? Для более простого тестирования в storybook делаем коллбэки необязательными. Так же может быть, что карточка пользователя будет неизменяема и эти коллбэки не будут нужны;
    onChangeFirstnameHandler?: (value?: string) => void;
    onChangeLastnameHandler?: (value?: string) => void;
    onChangeCityHandler?: (value?: string) => void;
    onChangeAgeHandler?: (value?: string) => void;
    onChangeUsernameHandler?: (value?: string) => void;
    onChangeAvatarHandler?: (value?: string) => void;
}

// ? Компонента с карточкой пользователя. Удобно тем, что можно создать большое количество экземпляров этой компоненты, передавая в неё массив профилей, например;
export const ProfileCard: React.FC<ProfileCardPropsI > = ({
    className, data, error, isLoading, readonly,
    onChangeFirstnameHandler, onChangeLastnameHandler,
    onChangeAgeHandler, onChangeCityHandler,
    onChangeAvatarHandler, onChangeUsernameHandler,
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
                {
                    data?.avatar
                        ? (
                            <div
                                className={cls['avatar-wrapper']}
                            >
                                <Avatar
                                    src={data?.avatar}
                                    alt={
                                        t('Аватар пользователя')
                                    }
                                />
                            </div>
                        )
                        : null
                }
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
                <Input
                    value={data?.username}
                    onChange={onChangeUsernameHandler}
                    placeholder={
                        t('Никнейм пользователя')
                    }
                    readonly={readonly}
                    className={cls.input}
                />
                <Input
                    value={data?.avatar}
                    onChange={onChangeAvatarHandler}
                    placeholder={
                        t('Аватар')
                    }
                    readonly={readonly}
                    className={cls.input}
                />
            </div>
        </div>
    );
};
