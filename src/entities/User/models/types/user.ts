import { USER_ROLE } from '@/shared/const/consts';
import { FeatureFlagsI } from '@/shared/types/featureFlags';
import { JsonSettingsI } from './jsonSettings';

export interface UserI {
    id: string;
    username: string;
    avatar?: string;
    roles?: USER_ROLE[];
    features?: FeatureFlagsI;
    jsonSettings?: JsonSettingsI;
}

export interface UserSchema {
    authData?: UserI;
    // ? Неизменяемое поле, изначально false. После инициализации данных о пользователе будет true. Для оптимизации работы роутов;
    _inited: boolean;
}
