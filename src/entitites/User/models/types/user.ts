export interface User {
    id: string;
    username: string;
}

export interface UserSchema {
    authData?: User;
// ? Неизменяемое поле, изначально false. После инициализации данных о пользователе будет true. Для оптимизации работы роутов;
    _inited: boolean;
}
