import { Suspense, lazy } from 'react';
import { ArticleRatingPropsI } from './ArticleRating';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

const ArticleRatingLazy = lazy(() => import('./ArticleRating'));

// ? Для более чистого кода, обёртку в Suspense lazy-компоненты можно осуществлять здесь;
export const ArticleRatingAsync = (props: ArticleRatingPropsI) => {
    return (
        <Suspense
            fallback={
                <Skeleton
                    width="100%"
                    height="120"
                />
            }
        >
            <ArticleRatingLazy {...props} />
        </Suspense>
    );
};
