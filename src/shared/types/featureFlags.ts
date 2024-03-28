/**
 * Типизация для фича-флагов, которые доступны на проекте для конкретного пользователя;
 */
export interface FeatureFlagsI {
    isArticleRatingEnabled?: boolean;
    isCounterEnabled?: boolean;
    isAppRedesigned?: boolean;
}