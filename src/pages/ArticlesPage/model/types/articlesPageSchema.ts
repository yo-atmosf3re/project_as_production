import { EntityState } from '@reduxjs/toolkit';
import {
    ArticleI,
} from 'entities/Article';
import { ARTICLE_SORT_FIELD, ARTICLE_TYPE, ARTICLE_VIEW } from 'shared/const/consts';

import { SortOrderType } from 'shared/types';

/**
 * Схема для инициализационного стейта ArticlesPage
 * @param isLoading - состояние загрузки;
 * @param error - содержимое ошибки в виде строки;
 * @param view - вид отображения статей - SMALL или BIG, для доступа используется enum ARTICLE_VIEW;
 * @param page - номер страницы;
 * @param limit - лимит, количество загружаемых статей за один раз;
 * @param hasMore - флаг, показывающий загружены ли все статьи или есть ещё статьи доступные для загрузки;
 * @param _inited - флаг, сигнализирующий об инициализации стейта. Изменяется лишь единожды при инициализации приложения;
 * @param order - порядок сортировки, asc - прямой, desc - обратный;
 * @param sort - вид поля из перечисления, по которому будет воспроизводиться сортировка;
 * @param search - поисковая строка, по которой будет поиск нужной статьи;
 * @param type - тема статьи, для доступа используется ARTICLE_TYPE;
 */
export interface ArticlesPageSchema extends EntityState<ArticleI> {
    isLoading?: boolean;
    error?: string;
    view: ARTICLE_VIEW;
    page: number;
    limit: number;
    hasMore: boolean;
    order: SortOrderType;
    sort: ARTICLE_SORT_FIELD;
    search: string;
    type: ARTICLE_TYPE;
    _inited: boolean;
}
