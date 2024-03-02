import React from 'react';
import { Text } from '@/shared/ui/Text';
import { ModsType, classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton';
import { AppLink } from '@/shared/ui/AppLink';
import { HStack, VStack } from '@/shared/ui/Stack';
import { CommentI } from '../../../model/types/comment';
import cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/shared/const/consts';

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

    return (
        <VStack
            max
            gap="8"
            className={classNames(cls['comment-card'], mods, [className])}
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
                    />
                </HStack>
            </AppLink>
            <Text
                className={cls['comment-text']}
                text={comment?.text}
            />
        </VStack>
    );
};
