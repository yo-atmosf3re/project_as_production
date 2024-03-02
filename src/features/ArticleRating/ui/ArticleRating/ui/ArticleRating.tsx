import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import {
    useGetArticleRating,
    useRateArticle,
} from '../../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';

export interface ArticleRatingPropsI {
    className?: string;
    articleId: string;
}

/**
 * Компонента, которая отрисовывает рейтинг и возможность его отправки для каждой отдельно взятой статьи (имплементация `RatingCard` для конкретного слоя `features`);
 * @param className
 * @param articleId - айди статьи;
 */
const ArticleRating: React.FC<ArticleRatingPropsI> = memo(
    ({ className, articleId }) => {
        const { t } = useTranslation('article');

        const userData = useSelector(getUserAuthData);
        const { data, isLoading } = useGetArticleRating({
            articleId,
            // ? Т.к userId у userData может быть undefined, указываем дефолтное значение (мало вероятно, что такой кейс когда-либо случится, потому что неавторизованный пользователь не может посещать страницы со статьями, а уж тем более отправлять и получать рейтинг);
            userId: userData?.id ?? '',
        });
        // ? Хук для мутаций возвращает массив с двумя элементами - функцию, которая вызывает мутацию, и объект с настройками (data, isLoading, isError и так далее);
        const [rateArticleMutation] = useRateArticle();

        // ? Если рейтинг (оценка) имеется, то из объекта data получаем первый объект, который ниже используем для получения данных, которые нужно передать в пропсы RatingCard;
        const rating = data?.[0];

        // ? Декомпозиция логики по отправки запроса, чтобы не дублировать один и тот же код в обработчиках ниже;
        const handleRateArticle = useCallback(
            (starsCount: number, feedback?: string): void => {
                try {
                    rateArticleMutation({
                        userId: userData?.id ?? '',
                        articleId,
                        rate: starsCount,
                        feedback,
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            [articleId, rateArticleMutation, userData?.id],
        );

        const onCancelHandler = useCallback(
            (starsCount: number): void => {
                handleRateArticle(starsCount);
            },
            [handleRateArticle],
        );

        const onAcceptHandler = useCallback(
            (starsCount: number, feedback?: string): void => {
                handleRateArticle(starsCount, feedback);
            },
            [handleRateArticle],
        );

        if (isLoading) {
            return (
                <Skeleton
                    width="100%"
                    height="120px"
                />
            );
        }

        return (
            <RatingCard
                onCancel={onCancelHandler}
                onAccept={onAcceptHandler}
                rate={rating?.rate}
                className={className}
                title={t('Оцените статью')}
                feedbackTitle={t(
                    'Оставьте свой отзыв о статье, это поможет улучшить качество сервиса!',
                )}
                hasFeedback
            />
        );
    },
);

export default ArticleRating;
