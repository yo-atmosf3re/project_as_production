import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleDetails } from '@/entities/Article';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments';
import { ArticleRating } from '@/features/ArticleRating';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/deprecated/Card';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { DetailsContainer } from '../DetailsContainer';
import { AdditionalInfoContanier } from '../AdditionalInfoContanier';

interface ArticleDetailsPagePropsI {
    className?: string;
}

const INITIAL_REDUCERS: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

/**
 * Страница полной и конкретной статьи, с блоками, комментариями, содержимым;
 * @param className
 */
const ArticleDetailsPage: React.FC<ArticleDetailsPagePropsI> = ({
    className,
}) => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation('article');

    if (!id) return null;

    const deprecatedArticleDetailsPage = (
        <Page className={classNames(cls['article-detials'], {}, [className])}>
            <VStack
                gap="16"
                max
            >
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                <ToggleFeatures
                    feature="isArticleRatingEnabled"
                    on={<ArticleRating articleId={id} />}
                    off={<Card>{t('Оценка статей скоро появится!')}</Card>}
                />
                <ArticleRecommendationsList />
                <ArticleDetailsComments id={id} />
            </VStack>
        </Page>
    );

    return (
        <DynamicModuleLoader reducers={INITIAL_REDUCERS}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <StickyContentLayout
                        content={
                            <Page
                                className={classNames(
                                    cls['article-detials'],
                                    {},
                                    [className],
                                )}
                            >
                                <VStack
                                    gap="16"
                                    max
                                >
                                    <DetailsContainer />
                                    <ArticleRating articleId={id} />
                                    <ArticleRecommendationsList />
                                    <ArticleDetailsComments id={id} />
                                </VStack>
                            </Page>
                        }
                        right={<AdditionalInfoContanier />}
                    />
                }
                off={deprecatedArticleDetailsPage}
            />
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
