import { EntityState } from '@reduxjs/toolkit';
import { ArticleI } from 'entities/Article';

export interface ArticleDetailsPageRecommendationsSchemaI
extends EntityState<ArticleI> {
    isLoading?: boolean;
    error?: string;
}
