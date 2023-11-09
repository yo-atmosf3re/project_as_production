import { StateSchema } from 'app/providers/StoreProvider';
import { ARTICLE_SORT_FIELD } from 'entities/Article';

export const getArticlesPageSort = (state: StateSchema) => state.articlesPage?.sort ?? ARTICLE_SORT_FIELD.CREATED;
