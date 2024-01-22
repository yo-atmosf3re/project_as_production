import { ProfileI } from '@/entities/Profile';
import { VALIDATE_PROFILE_ERROR } from '@/shared/const/consts';

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
