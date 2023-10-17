import { COUNTRY, CURRENCY } from 'shared/const/common';

export interface ProfileI {
    first?: string;
    lastname?: string;
    age?: number;
    currency?: CURRENCY;
    country?: COUNTRY;
    city?: string;
    username?: string;
    avatar?: string;
}

export interface ProfileSchema {
    // ? data - тут хранятся данные, которые получе непосредственно с сервера;
    data?: ProfileI;
    // ? form - данные из data, которые пользователь изменил сам;
    form?: ProfileI;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
}
