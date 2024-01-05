import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { USER_ROLE } from '../../types/user';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

// ? С помощью реселекта мемоизируем получение списка ролей, а затем проверяем внутри самого селектора роль. Проверяется это всё лишь при первом получении этих данных, удобство в том, что не нужно каждый раз проводить какие-то манипуляции с массивом ролей, а в переменной isUserAdmin или isUserManager будут хранится актуальные значения;
/**
 * Возвращает `true`, если пользователь является админом;
 */
export const isUserAdmin = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(USER_ROLE.ADMIN)));

/**
 * Возвращает `true`, если пользователь является менеджером;
 */
export const isUserManager = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(USER_ROLE.MANAGER)));
