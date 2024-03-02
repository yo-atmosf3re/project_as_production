import { StateSchema } from '@/app/providers/StoreProvider';
import { ARTICLE_TYPE } from '@/shared/const/consts';

export const getArticlesPageType = (state: StateSchema) =>
    state.articlesPage?.type ?? ARTICLE_TYPE.ALL;
