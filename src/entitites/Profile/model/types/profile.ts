import { COUNTRY } from 'entitites/Country';
import { CURRENCY } from 'entitites/Currency';

// ? Типы валидационных ошибок;
export enum VALIDATE_PROFILE_ERROR {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',
}

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
    // ? Может быть undefined, что означает, что ошибок, а так как их может быть несколько, то это массив;
    validateErrors?: VALIDATE_PROFILE_ERROR[];
}
