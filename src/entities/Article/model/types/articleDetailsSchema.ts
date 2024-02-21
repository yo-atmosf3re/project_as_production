// ? Интерфейс для статей (сами статьи, подгрузка, ошибки);

import { ArticleI } from './article';

export interface ArticleDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: ArticleI;
}
