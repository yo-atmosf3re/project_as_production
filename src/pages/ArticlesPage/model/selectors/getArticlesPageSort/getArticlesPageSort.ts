import { StateSchema } from '@/app/providers/StoreProvider';
import { ARTICLE_SORT_FIELD } from '@/shared/const/consts';

export const getArticlesPageSort = (state: StateSchema) =>
    state.articlesPage?.sort ?? ARTICLE_SORT_FIELD.CREATED;
