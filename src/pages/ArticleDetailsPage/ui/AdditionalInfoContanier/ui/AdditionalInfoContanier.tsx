import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cls from './AdditionalInfoContanier.module.scss';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { Card } from '@/shared/ui/redesigned/Card';
import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit } from '@/shared/const/consts';

interface AdditionalInfoContanierPropsI {
    className?: string;
}

/**
 * Контейнерная компонента, которая отрисовывает боковое меню в `ArticleDetailsPage` с информацией о статье;
 * @param className
 */
export const AdditionalInfoContanier: React.FC<AdditionalInfoContanierPropsI> =
    memo(({ className }) => {
        const article = useSelector(getArticleDetailsData);
        const navigate = useNavigate();

        const onEditArticle = useCallback(() => {
            if (article) {
                navigate(getRouteArticleEdit(article.id));
            }
        }, [article, navigate]);

        if (!article) return null;

        return (
            <Card
                padding="24"
                border="partial"
                className={cls.card}
            >
                <ArticleAdditionalInfo
                    onEdit={onEditArticle}
                    author={article.user}
                    createdAt={article.createdAt}
                    views={article.views}
                    className={className}
                />
            </Card>
        );
    });
