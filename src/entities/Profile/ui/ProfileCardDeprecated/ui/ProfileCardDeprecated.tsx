import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileCardDeprecated.module.scss';
import { ProfileCardPropsI } from '../../ProfileCard/ProfileCard';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { TEXT_THEME, TEXT_ALIGN, Text } from '@/shared/ui/deprecated/Text';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Input } from '@/shared/ui/deprecated/Input';
import { Loader } from '@/shared/ui/deprecated/Loader';

/**
 * Компонента, отрисовывающая лоудер для устаревшей карточки профиля;
 * @deprecated
 */
export const ProfileCardDeprecatedLoader = () => {
    return (
        <VStack
            max
            align="center"
            justify="center"
            className={classNames(cls['profile-card'], { [cls.loading]: true })}
        >
            <Loader />
        </VStack>
    );
};

/**
 * Компонента, отрисовывающая ошибку для устаревшей карточки профиля;
 * @deprecated
 */
export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation('profile');
    return (
        <HStack
            max
            align="center"
            justify="center"
            className={classNames(cls['profile-card'], {}, [cls.error])}
        >
            <Text
                theme={TEXT_THEME.ERROR}
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align={TEXT_ALIGN.CENTER}
            />
        </HStack>
    );
};

/**
 *  Описания и пропсы аналогичны компоненте `ProfileCard`;
 * @deprecated
 */
export const ProfileCardDeprecated: React.FC<ProfileCardPropsI> = ({
    className,
    data,
    readonly,
    onChangeFirstnameHandler,
    onChangeLastnameHandler,
    onChangeAgeHandler,
    onChangeCityHandler,
    onChangeAvatarHandler,
    onChangeUsernameHandler,
    onChangeCurrencyHandler,
    onChangeCountryHandler,
}) => {
    const { t } = useTranslation('profile');

    return (
        <VStack
            gap="16"
            max
            className={classNames(cls['profile-card'], {}, [className])}
        >
            {data?.avatar ? (
                <HStack
                    max
                    className={cls['avatar-wrapper']}
                >
                    <Avatar
                        src={data?.avatar}
                        alt={t('Аватар пользователя')}
                    />
                </HStack>
            ) : null}
            <Input
                value={data?.first}
                onChange={onChangeFirstnameHandler}
                placeholder={t('Ваше имя')}
                readonly={readonly}
                className={cls.input}
                data-testid="ProfileCard.firstname"
            />
            <Input
                value={data?.lastname}
                onChange={onChangeLastnameHandler}
                placeholder={t('Ваша фамилия')}
                readonly={readonly}
                className={cls.input}
                data-testid="ProfileCard.lastname"
            />
            <Input
                value={data?.age}
                onChange={onChangeAgeHandler}
                placeholder={t('Возраст')}
                readonly={readonly}
                className={cls.input}
            />
            <Input
                value={data?.city}
                onChange={onChangeCityHandler}
                placeholder={t('Город')}
                readonly={readonly}
                className={cls.input}
            />
            <Input
                value={data?.username}
                onChange={onChangeUsernameHandler}
                placeholder={t('Никнейм пользователя')}
                readonly={readonly}
                className={cls.input}
            />
            <Input
                value={data?.avatar}
                onChange={onChangeAvatarHandler}
                placeholder={t('Аватар')}
                readonly={readonly}
                className={cls.input}
            />
            <CurrencySelect
                value={data?.currency}
                onChange={onChangeCurrencyHandler}
                className={cls.input}
                readonly={readonly}
            />
            <CountrySelect
                value={data?.country}
                onChange={onChangeCountryHandler}
                className={cls.input}
                readonly={readonly}
            />
        </VStack>
    );
};
