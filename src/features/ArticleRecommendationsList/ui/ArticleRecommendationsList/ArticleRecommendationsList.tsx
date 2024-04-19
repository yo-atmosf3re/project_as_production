import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated, TEXT_SIZE } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleList } from '@/entities/Article';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';
import { ToggleFeatures } from '@/shared/lib/features';

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
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <Text
                            size="l"
                            title={t('Рекомендуем')}
                        />
                    }
                    off={
                        <TextDeprecated
                            size={TEXT_SIZE.L}
                            title={t('Рекомендуем')}
                        />
                    }
                />
                <ArticleList
                    articles={article}
                    target="_blank"
                />
            </VStack>
        );
    });
