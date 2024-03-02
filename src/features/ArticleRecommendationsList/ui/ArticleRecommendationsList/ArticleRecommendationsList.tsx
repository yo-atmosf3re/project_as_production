import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { Text, TEXT_SIZE } from '@/shared/ui/Text';
import { ArticleList } from '@/entities/Article';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListPropsI {
    className?: string;
}

/**
 * Декомпозиция логики, которая связана с запросом рекомендованных статей (для очистки `ArticleDetailsPage`), и применение здесь RTK Query;
 */
export const ArticleRecommendationsList: React.FC<ArticleRecommendationsListPropsI> =
    memo(() => {
        const { t } = useTranslation('article');
        const {
            data: article,
            isLoading,
            error,
        } = useArticleRecommendationsList(3);

        if (isLoading || error || !article) {
            return null;
        }

        return (
            <VStack
                gap="8"
                data-testid="ArticleRecommendationsList"
            >
                <Text
                    size={TEXT_SIZE.L}
                    title={t('Рекомендуем')}
                />
                <ArticleList
                    articles={article}
                    target="_blank"
                />
            </VStack>
        );
    });