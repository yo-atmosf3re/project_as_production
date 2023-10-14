import { COUNTRY, CURRENCY } from 'shared/const/common';

export interface ProfileI {
    first: string;
    lastname: string;
    age: string;
    currency: CURRENCY;
    country: COUNTRY;
    city: string;
    username: string;
    avatar: string;
}

export interface ProfileSchema {
    data?: ProfileI;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
}
