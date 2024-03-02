import { EntityState } from '@reduxjs/toolkit';
import { CommentI } from '@/entities/Comment';

/**
 Схема для комментариев. Экстендимся от редаксовского интерфейса, чтобы подтягивались нужные типы - массив ids, объекты entities (где ключами являются id (string | number), а значения - объекты, всё это нужно для более удобной нормализации данных);
 *  */
export interface ArticleDetailsCommentsSchema extends EntityState<CommentI> {
    isLoading?: boolean;
    error?: string;
}
