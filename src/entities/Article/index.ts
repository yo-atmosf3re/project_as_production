export { ArticleTypeTabs } from 'entities/Article/ui/ArticleTypeTabs';
export { ArticleSortSelector } from './ui/ArticleSortSelector';
export { ArticleList } from './ui/ArticleList';
export { ArticleDetails } from './ui/ArticleDetails';
export { ArticleViewSelector } from './ui/ArticleViewSelector';

export {
    ArticleI, ARTICLE_VIEW, ARTICLE_SORT_FIELD, ARTICLE_TYPE, ARTICLE_BLOCK_TYPE,
} from './model/types/article';
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';

export { getArticleDetailsData } from './model/selectors/getArticleDetails/getArticleDetailsData';
