import React from 'react';

import { COUNTRY } from '@/entities/Country';
import { CURRENCY } from '@/shared/const/consts';
import { ProfileI } from '../../index';
import { ToggleFeatures } from '@/shared/lib/features';
import { ProfileCardDeprecated } from '../ProfileCardDeprecated';
import {
    ProfileCardRedesigned,
    ProfileCardRedesignedError,
    ProfileCardRedesignedSkeleton,
} from '../ProfileCardRedesigned/ui/ProfileCardRedesigned';
import {
    ProfileCardDeprecatedError,
    ProfileCardDeprecatedLoader,
} from '../ProfileCardDeprecated/ui/ProfileCardDeprecated';

export interface ProfileCardPropsI {
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
    onChangeCurrencyHandler?: (currency: CURRENCY) => void;
    onChangeCountryHandler?: (country: COUNTRY) => void;
}

/**
 *  Компонента с карточкой пользователя, может быть использована множество раз в любом месте приложения;
 * @param className
 * @param data - данные профиля;
 * @param error
 * @param isLoading
 * @param readonly - флаг, указывающий на то, является ли профиль для чтения;
 * @param onChangeFirstnameHandler
 * @param onChangeLastnameHandler
 * @param onChangeAgeHandler
 * @param onChangeCityHandler
 * @param onChangeAvatarHandler
 * @param onChangeUsernameHandler
 * @param onChangeCurrencyHandler
 * @param onChangeCountryHandler
 */
export const ProfileCard: React.FC<ProfileCardPropsI> = (props) => {
    const { isLoading, error } = props;

    if (isLoading) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<ProfileCardRedesignedSkeleton />}
                off={<ProfileCardDeprecatedLoader />}
            />
        );
    }

    if (error) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<ProfileCardRedesignedError />}
                off={<ProfileCardDeprecatedError />}
            />
        );
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={<ProfileCardRedesigned {...props} />}
            off={<ProfileCardDeprecated {...props} />}
        />
    );
};
