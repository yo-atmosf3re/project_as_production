import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { ARTICLE_VIEW } from '@/shared/const/consts';
import cls from '../../ArticleListItem/ui/ArticleListItem.module.scss';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';

interface ArticleListItemSkeletonPropsI {
    className?: string;
    view: ARTICLE_VIEW;
}
/**
 * Компонента, которая является скелетоном для карточек статьи из списка статей, которые отрисовываются в ArticleList во время загрузки;
 * @param className
 * @param view - тип отображения скелетонов в списке ArticleList, для доступа используется enum ARTICLE_VIEW;
 */
export const ArticleListItemSkeleton: React.FC<
    ArticleListItemSkeletonPropsI
> = ({ className, view }) => {
    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls['list-redesigned'],
        off: () => cls['article-item'],
    });

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    // const Card = toggleFeatures({
    //     name: 'isAppRedesigned',
    //     on: () => CardRedesigned,
    //     off: () => CardDeprecated,
    // });

    // if (view === 'BIG') {
    //     return (
    //         <div className={classNames(mainClass, {}, [className, cls[view]])}>
    //             <Card className={cls.card}>
    //                 <div className={cls.header}>
    //                     <Skeleton
    //                         border="50%"
    //                         height={30}
    //                         width={30}
    //                     />
    //                     <Skeleton
    //                         width={150}
    //                         height={16}
    //                         className={cls.username}
    //                     />
    //                     <Skeleton
    //                         width={150}
    //                         height={16}
    //                         className={cls.date}
    //                     />
    //                 </div>
    //                 <Skeleton
    //                     width={250}
    //                     height={24}
    //                     className={cls.title}
    //                 />
    //                 <Skeleton
    //                     height={200}
    //                     className={cls.image}
    //                 />
    //                 <div className={cls.footer}>
    //                     <Skeleton
    //                         height={36}
    //                         width={200}
    //                     />
    //                 </div>
    //             </Card>
    //         </div>
    //     );
    // }

    if (view === 'BIG') {
        const cardContent = (
            <>
                <div className={cls.header}>
                    <Skeleton
                        border="50%"
                        height={30}
                        width={30}
                    />
                    <Skeleton
                        width={150}
                        height={16}
                        className={cls.username}
                    />
                    <Skeleton
                        width={150}
                        height={16}
                        className={cls.date}
                    />
                </div>
                <Skeleton
                    width={250}
                    height={24}
                    className={cls.title}
                />
                <Skeleton
                    height={200}
                    className={cls.image}
                />
                <div className={cls.footer}>
                    <Skeleton
                        height={36}
                        width={200}
                    />
                </div>
            </>
        );
        return (
            <div className={classNames(mainClass, {}, [className, cls[view]])}>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <CardRedesigned
                            border="round"
                            className={cls.card}
                        >
                            {cardContent}
                        </CardRedesigned>
                    }
                    off={
                        <CardDeprecated className={cls.card}>
                            {cardContent}
                        </CardDeprecated>
                    }
                />
            </div>
        );
    }

    const cardContent = (
        <>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Skeleton
                        width="100%"
                        height={150}
                        border="32px"
                        className={cls.image}
                    />
                }
                off={
                    <div className={cls['image-wrapper']}>
                        <Skeleton
                            width={200}
                            height={200}
                            className={cls.image}
                        />
                    </div>
                }
            />
            <div className={cls['skeleton-footer']}>
                <div className={cls['info-wrapper']}>
                    <Skeleton
                        width={130}
                        height={16}
                    />
                </div>
                <Skeleton
                    width={150}
                    height={16}
                    className={cls.title}
                />
            </div>
        </>
    );

    return (
        <div className={classNames(mainClass, {}, [className, cls[view]])}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <CardRedesigned
                        border="round"
                        className={cls.card}
                        padding="0"
                    >
                        {cardContent}
                    </CardRedesigned>
                }
                off={
                    <CardDeprecated className={cls.card}>
                        {cardContent}
                    </CardDeprecated>
                }
            />
        </div>
    );
};

// return (
//     <Card
//         className={classNames(mainClass, {}, [className, cls[view]])}
//         border="round"
//         padding="16"
//     >
//         <VStack
//             justify="center"
//             className={cls['image-wrapper']}
//             align="center"
//             gap="16"
//         >
//             <Skeleton
//                 width={224}
//                 height={140}
//                 className={cls.image}
//             />
//             <Skeleton
//                 width={224}
//                 height={30}
//             />
//         </VStack>
//         <VStack
//             justify="center"
//             align="center"
//             gap="8"
//         >
//             <HStack
//                 className={cls['info-wrapper']}
//                 justify="between"
//                 max
//             >
//                 <Skeleton
//                     width={75}
//                     height={25}
//                 />
//                 <Skeleton
//                     width={75}
//                     height={25}
//                 />
//             </HStack>
//             <HStack max>
//                 <Skeleton
//                     className={cls.title}
//                     width={45}
//                     height={25}
//                 />
//             </HStack>
//         </VStack>
//     </Card>
// );
