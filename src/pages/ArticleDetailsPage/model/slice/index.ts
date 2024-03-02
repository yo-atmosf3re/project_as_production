import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageSchema } from '../types/index';
import { articleDetailsPageRecommendationsReducer } from './articleDetailsPageRecommendationsSlice';
import { articleDetailsCommetsReducer } from './articleDetailsCommentSlice';

/**
 * Комбинация редьюсеров из `ArticleDetialsPage` (вариант для практики);
 */
export const articleDetailsPageReducer =
    combineReducers<ArticleDetailsPageSchema>({
        recommendations: articleDetailsPageRecommendationsReducer,
        comments: articleDetailsCommetsReducer,
    });
