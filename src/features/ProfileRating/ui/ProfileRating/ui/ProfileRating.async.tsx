import { Suspense, lazy } from 'react';
import { ProfileRatingPropsI } from './ProfileRating';
import { Skeleton } from '@/shared/ui/Skeleton';

const ProfileRatingLazy = lazy(() => import('./ProfileRating'));

export const ProfileRatingAsync = (props: ProfileRatingPropsI) => {
    return (
        <Suspense
            fallback={(
                <Skeleton
                    width="100%"
                    height="120"
                />
            )}
        >
            <ProfileRatingLazy
                {...props}
            />
        </Suspense>
    );
};
