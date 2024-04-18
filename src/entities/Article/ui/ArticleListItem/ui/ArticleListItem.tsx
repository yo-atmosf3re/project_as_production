import React, { HTMLAttributeAnchorTarget } from 'react';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleListItemDeprecated } from './ArticleListItemDeprecated';
import { ArticleI } from '../../..';
import { ARTICLE_VIEW } from '@/shared/const/consts';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned';

export interface ArticleListItemPropsI {
    className?: string;
    article: ArticleI;
    view: ARTICLE_VIEW;
    target?: HTMLAttributeAnchorTarget;
}
/**
 * Компонента, которая является элементом списка статей, которые отрисовываются в ArticleList;
 * @param className
 * @param article - статья для отрисовки;
 * @param view - тип отображения статьи в списке ArticleList (по-умолчанию SMALL, определено из родительской компоненты), для доступа используется enum ARTICLE_VIEW;
 * @param target - классический атрибут `target` тега `a`;
 */
export const ArticleListItem: React.FC<ArticleListItemPropsI> = (props) => {
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={<ArticleListItemRedesigned {...props}/>}
            off={<ArticleListItemDeprecated {...props} />}
        />
    );
};
