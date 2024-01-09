import { StateSchema } from 'app/providers/StoreProvider';
import { ARTICLE_VIEW } from 'shared/const/consts';

export const getArticlesPageView = (state:StateSchema) => state.articlesPage?.view || ARTICLE_VIEW.SMALL;
