import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleDetails } from '@/entities/Article';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments';
import { ArticleRating } from '@/features/ArticleRating';
import { getFeatureFlags } from '@/shared/lib/features';
import { Counter } from '@/entities/Counter';

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

    const isArticleRatingEnabled = getFeatureFlags('isArticleRatingEnabled');
    const isCounterEnabled = getFeatureFlags('isCounterEnabled');

    if (!id) {
        return null;
    }

    return (
        <DynamicModuleLoader reducers={INITIAL_REDUCERS}>
            <Page
                className={classNames(cls['article-detials'], {}, [className])}
            >
                <VStack
                    gap="16"
                    max
                >
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    {isCounterEnabled && <Counter />}
                    {isArticleRatingEnabled && <ArticleRating articleId={id} />}
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
function getFeatureFlag() {
    throw new Error('Function not implemented.');
}
