import { RouteProps } from 'react-router-dom';
import { USER_ROLE } from '../const/consts';

// ? Типы для роутера;

// ? Объединяем в один тип RouteProps из RRD, добавляем поле authOnly, которое если true, то блокирует роуты;
export type AppRoutesPropsType = RouteProps & {
    authOnly?: boolean;
    // ? Указания требуемых ролей для тех страниц, на которых требуется конкретная роль (пример: админ панель - нужна роль админа), может быть несколько ролей для какой-либо страницы;
    roles?: USER_ROLE[];
};
