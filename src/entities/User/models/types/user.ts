import { USER_ROLE } from '@/shared/const/consts';

export interface UserI {
    id: string;
    username: string;
    avatar?: string;
    roles?: USER_ROLE[];
}

export interface UserSchema {
    authData?: UserI;
// ? Неизменяемое поле, изначально false. После инициализации данных о пользователе будет true. Для оптимизации работы роутов;
    _inited: boolean;
}
