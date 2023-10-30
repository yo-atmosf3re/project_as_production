import { EntityState } from '@reduxjs/toolkit';
import { ARTICLE_VIEW, ArticleI } from 'entities/Article';

/**
 * Схема для инициализационного стейта ArticlesPage
 * @param isLoading - состояние загрузки;
 * @param error - содержимое ошибки в виде строки;
 * @param view - вид отображения статей - SMALL или BIG, для доступа используется enum ARTICLE_VIEW;
 */
export interface ArticlesPageSchema extends EntityState<ArticleI> {
    isLoading?: boolean;
    error?: string;
    view: ARTICLE_VIEW;
}
