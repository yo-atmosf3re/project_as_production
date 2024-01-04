export enum USER_ROLE {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MANAGER = 'MANAGER',
}

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
