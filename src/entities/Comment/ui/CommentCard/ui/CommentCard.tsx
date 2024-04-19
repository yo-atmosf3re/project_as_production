import React from 'react';
import { Text } from '@/shared/ui/redesigned/Text';
import { ModsType, classNames } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { CommentI } from '../../../model/types/comment';
import cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/shared/const/consts';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

interface CommentCardPropsI {
    className?: string;
    comment?: CommentI;
    isLoading?: boolean;
}

/**
 * Блок с одним комментарием. В CommentList с помощью .map() итерируемся по массиву с комментариями, каждый элемент из такого массива попадает в CommentCard;
 * @param className
 * @param comment - сам комментарий, который будет отрисовываться в блоке комментария;
 * @param isLoading - состояние загрузки;
 * @returns
 */
export const CommentCard: React.FC<CommentCardPropsI> = ({
    className,
    comment,
    isLoading,
}) => {
    const mods: ModsType = {};

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    if (isLoading) {
        return (
            <VStack
                max
                gap="8"
                className={classNames(cls['comment-card'], mods, [
                    className,
                    cls['comment-loading'],
                ])}
                data-testid="CommentCard.Loading"
            >
                <VStack
                    gap="8"
                    className={cls['comment-header']}
                >
                    <Skeleton
                        width={30}
                        height={30}
                        border="50%"
                    />
                    <Skeleton
                        width={100}
                        height={16}
                        border="6px"
                        className={cls['comment-username']}
                    />
                </VStack>
                <Skeleton
                    width="100%"
                    height={50}
                    border="6px"
                    className={cls['comment-text']}
                />
            </VStack>
        );
    }

    if (!comment) return null;

    const deprecatedCommentCard = (
        <VStack
            max
            gap="8"
            className={classNames(cls['comment-card'], mods, [className])}
            data-testid="CommentCard.Content"
        >
            <AppLinkDeprecated to={getRouteProfile(comment.user.id)}>
                <HStack
                    gap="8"
                    align="center"
                >
                    {comment?.user.avatar ? (
                        <AvatarDeprecated
                            src={comment?.user.avatar}
                            size={30}
                        />
                    ) : null}
                    <Text
                        className={cls['comment-username']}
                        title={comment?.user.username}
                    />
                </HStack>
            </AppLinkDeprecated>
            <Text
                className={cls['comment-text']}
                text={comment?.text}
            />
        </VStack>
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    padding="24"
                    border="partial"
                    max
                >
                    <VStack
                        max
                        gap="8"
                        className={classNames(cls['card-redesigned'], mods, [
                            className,
                        ])}
                        data-testid="CommentCard.Content"
                    >
                        <AppLink to={getRouteProfile(comment.user.id)}>
                            <HStack
                                gap="8"
                                align="center"
                            >
                                {comment?.user.avatar ? (
                                    <Avatar
                                        src={comment?.user.avatar}
                                        size={30}
                                    />
                                ) : null}
                                <Text
                                    className={cls['comment-username']}
                                    title={comment?.user.username}
                                    bold
                                />
                            </HStack>
                        </AppLink>
                        <Text
                            className={cls['comment-text']}
                            text={comment?.text}
                        />
                    </VStack>
                </Card>
            }
            off={deprecatedCommentCard}
        />
    );
};
