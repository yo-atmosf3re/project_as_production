/* eslint-disable react/no-array-index-key */
import React, { HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TEXT_SIZE } from '@/shared/ui/deprecated/Text';
import { ArticleI } from '../../../model/types/article';
import { ARTICLE_VIEW } from '@/shared/const/consts';
import cls from './ArticleList.module.scss';
import { ArticleListItem } from '../../ArticleListItem';
import { ArticleListItemSkeleton } from '../../ArticleListItemSkeleton';
import { ToggleFeatures } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleListPropsI {
    className?: string;
    articles: ArticleI[];
    isLoading?: boolean;
    view?: ARTICLE_VIEW;
    target?: HTMLAttributeAnchorTarget;
}

const GET_SKELETONS = (view: ARTICLE_VIEW): JSX.Element[] =>
    new Array(view === ARTICLE_VIEW.SMALL ? 9 : 3).fill(0).map((_, index) => (
        <ArticleListItemSkeleton
            className={cls.card}
            key={index}
            view={view}
        />
    ));

/**
 * Компонента, которая отрисовывает список статей;
 * @param className
 * @param articles - массив со статьями;
 * @param isLoading - состояние загрузки;
 * @param view - тип отображения списка со статьями (по-умолчанию SMALL), для доступа используется enum ARTICLE_VIEW;
 * @param target - классический атрибут `target` тега `a`. В нужном месте, где отрисовывается `ArticleList`, можно настроить `target`, который прокидывается в дочерние `ArticleListItem`;
 */
export const ArticleList: React.FC<ArticleListPropsI> = ({
    className,
    articles,
    isLoading,
    view = ARTICLE_VIEW.SMALL,
    target,
}) => {
    const { t } = useTranslation('article');

    const renderArticle = (article: ArticleI) => (
        <ArticleListItem
            article={article}
            view={view}
            className={cls.card}
            target={target}
            key={article.id}
        />
    );

    if (!isLoading && !articles.length) {
        return (
            <div
                className={classNames(cls['article-list'], {}, [
                    className,
                    cls[view],
                ])}
            >
                <Text
                    title={t('Статьи не найдены!')}
                    size={TEXT_SIZE.L}
                />
            </div>
        );
    }

    const deprecatedArticleList = (
        <div
            className={classNames(cls['article-list'], {}, [
                className,
                cls[view],
            ])}
            data-testid="ArticleList"
        >
            {articles.length > 0 ? articles.map(renderArticle) : null}
            {isLoading ? GET_SKELETONS(view) : null}
        </div>
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <HStack
                    wrap="wrap"
                    gap="16"
                    className={classNames(cls['list-redesigned'], {}, [])}
                    data-testid="ArticleList"
                >
                    {articles.length > 0 ? articles.map(renderArticle) : null}
                    {isLoading ? GET_SKELETONS(view) : null}
                </HStack>
                // <HStack
                //     wrap="wrap"
                //     gap="16"
                //     className={classNames(cls['list-redesigned'], {}, [])}
                //     data-testid="ArticleList"
                // >
                //     {GET_SKELETONS(view)}
                // </HStack>
            }
            off={deprecatedArticleList}
        />
    );
};
