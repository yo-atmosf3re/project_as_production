import { EntityState } from '@reduxjs/toolkit';
import { ArticleI } from '@/entities/Article';

export interface ArticleDetailsPageRecommendationsSchema
    extends EntityState<ArticleI> {
    isLoading?: boolean;
    error?: string;
}
