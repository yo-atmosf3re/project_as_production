import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileCardPropsI } from '../../ProfileCard/ProfileCard';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

/**
 * Компонента, отрисовывающая скелетоны для карточки профиля с редизайном;
 */
export const ProfileCardRedesignedSkeleton = () => {
    return (
        <Card
            padding="24"
            max
        >
            <VStack gap="32">
                <HStack
                    max
                    justify="center"
                >
                    <Skeleton
                        border="100%"
                        height={128}
                        width={128}
                    />
                </HStack>
                <HStack
                    gap="32"
                    max
                >
                    <VStack
                        gap="16"
                        max
                    >
                        <Skeleton
                            width="100%"
                            height={38}
                        />
                        <Skeleton
                            width="100%"
                            height={38}
                        />
                        <Skeleton
                            width="100%"
                            height={38}
                        />
                        <Skeleton
                            width="100%"
                            height={38}
                        />
                    </VStack>
                    <VStack
                        gap="16"
                        max
                    >
                        <Skeleton
                            width="100%"
                            height={38}
                        />
                        <Skeleton
                            width="100%"
                            height={38}
                        />
                        <Skeleton
                            width="100%"
                            height={38}
                        />
                        <Skeleton
                            width="100%"
                            height={38}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};

/**
 * Компонента, отрисовывающая ошибку для карточки профиля с редизайном;
 */
export const ProfileCardRedesignedError = () => {
    const { t } = useTranslation('profile');

    return (
        <HStack
            max
            align="center"
            justify="center"
        >
            <Text
                variant="error"
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align="center"
            />
        </HStack>
    );
};

/**
 *  Описания и пропсы аналогичны компоненте `ProfileCard`;
 */
export const ProfileCardRedesigned: React.FC<ProfileCardPropsI> = ({
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
        <Card
            padding="24"
            max
            className={className}
        >
            <VStack gap="32">
                {data?.avatar ? (
                    <HStack
                        max
                        justify="center"
                    >
                        <Avatar
                            src={data?.avatar}
                            alt={t('Аватар пользователя')}
                            size={120}
                        />
                    </HStack>
                ) : null}
                <HStack
                    gap="24"
                    max
                >
                    <VStack
                        gap="16"
                        max
                    >
                        <Input
                            value={data?.first}
                            onChange={onChangeFirstnameHandler}
                            label={t('Ваше имя')}
                            readonly={readonly}
                            data-testid="ProfileCard.firstname"
                        />
                        <Input
                            value={data?.lastname}
                            onChange={onChangeLastnameHandler}
                            label={t('Ваша фамилия')}
                            readonly={readonly}
                            data-testid="ProfileCard.lastname"
                        />
                        <Input
                            value={data?.age}
                            onChange={onChangeAgeHandler}
                            label={t('Возраст')}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.city}
                            onChange={onChangeCityHandler}
                            label={t('Город')}
                            readonly={readonly}
                        />
                    </VStack>
                    <VStack
                        gap="16"
                        max
                    >
                        <Input
                            value={data?.username}
                            onChange={onChangeUsernameHandler}
                            label={t('Никнейм пользователя')}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.avatar}
                            onChange={onChangeAvatarHandler}
                            label={t('Аватар')}
                            readonly={readonly}
                        />
                        <CurrencySelect
                            value={data?.currency}
                            onChange={onChangeCurrencyHandler}
                            readonly={readonly}
                        />
                        <CountrySelect
                            value={data?.country}
                            onChange={onChangeCountryHandler}
                            readonly={readonly}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};
