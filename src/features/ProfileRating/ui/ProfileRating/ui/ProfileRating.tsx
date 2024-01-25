import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import { useGetProfileRating, useRateProfile } from '../../../api/profileRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';

export interface ProfileRatingPropsI {
    className?: string;
    profileId: string;
}

// ? Схожесть с ArticleRating вызвана тем, что в методах оценки и внутренняя логика по итогу, в зависимости от дальнейшего ТЗ, могут отличаться, поэтому существует два, так похожие друг на друга, слайса с заделом на будущее;
/**
 * Компонента, которая отрисовывает рейтинг и возможность его отправки в профиле конкретного пользователя (имплементация `RatingCard` для конкретного слоя `features`);
 * @param className
 * @param profileId - айди профиля;
 */
const ProfileRating: React.FC<ProfileRatingPropsI> = memo(({
    className, profileId,
}) => {
    const { t } = useTranslation('profile');

    const userData = useSelector(getUserAuthData);
    const { data, isLoading } = useGetProfileRating({
        profileId,
        userId: userData?.id ?? '',
    });
    const [rateProfileMutation] = useRateProfile();

    const rating = data?.[0];

    const handleRateProfile = useCallback((starsCount: number, feedback?: string): void => {
        try {
            rateProfileMutation(
                {
                    userId: userData?.id ?? '',
                    profileId,
                    rate: starsCount,
                    feedback,
                },
            );
        } catch (error) {
            console.log(error);
        }
    }, [profileId, rateProfileMutation, userData?.id]);

    const onCancelHandler = useCallback((starsCount: number): void => {
        handleRateProfile(starsCount);
    }, [handleRateProfile]);

    const onAcceptHandler = useCallback((starsCount: number, feedback?: string): void => {
        handleRateProfile(starsCount, feedback);
    }, [handleRateProfile]);

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
            title={
                t('Оцените профиль пользователя!')
            }
        />
    );
});

export default ProfileRating;
