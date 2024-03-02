import React from 'react';
import { useTranslation } from 'react-i18next';
import { ModsType, classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';
import { CommentCard } from '../../CommentCard';
import { CommentI } from '../../../model/types/comment';

interface CommentListPropsI {
    className?: string;
    // ? Для переиспользования компоненты принимаем комментарии из вне;
    comments?: CommentI[];
    isLoading?: boolean;
}

// ? Хранится и отрисовывается в ArticleDetailsPage;
/**
 * Компонента, в которую передаются комментарии, и которая их отрисовывает;
 * @param className
 * @param comments - массив с комментариями;
 * @param isLoading - состояние загрузки;
 */
export const CommentList: React.FC<CommentListPropsI> = ({
    className,
    comments,
    isLoading,
}) => {
    const { t } = useTranslation('article');
    const mods: ModsType = {};

    if (isLoading) {
        return (
            <VStack
                gap="16"
                max
                className={classNames('', mods, [className])}
            >
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </VStack>
        );
    }

    return (
        <VStack
            gap="16"
            max
            className={classNames('', mods, [className])}
        >
            {comments?.length ? (
                comments.map((comment) => (
                    <CommentCard
                        key={comment.id + comment.text}
                        isLoading={isLoading}
                        comment={comment}
                    />
                ))
            ) : (
                <Text text={t('Комментарии отсутствуют')} />
            )}
        </VStack>
    );
};
