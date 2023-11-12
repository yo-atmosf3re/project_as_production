import { StateSchema } from 'app/providers/StoreProvider';
import { ARTICLE_TYPE } from 'entities/Article';

export const getArticlesPageType = (state: StateSchema) => state.articlesPage?.type ?? ARTICLE_TYPE.ALL;
