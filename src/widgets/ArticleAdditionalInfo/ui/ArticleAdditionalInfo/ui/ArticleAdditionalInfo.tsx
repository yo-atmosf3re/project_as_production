import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleAdditionalInfo.module.scss';
import { UserI } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';

interface ArticleAdditionalInfoPropsI {
    className?: string;
    author: UserI;
    createdAt: string;
    views: number;
    onEdit: () => void;
}

/**
 * Компонента, которая отрисовывает информацию о конкретной статье справа в `layout`;
 * @param className
 */
export const ArticleAdditionalInfo: React.FC<ArticleAdditionalInfoPropsI> =
    memo(({ className, author, createdAt, views, onEdit }) => {
        const { t } = useTranslation('article');
        return (
            <VStack
                className={classNames(cls.ArticleAdditionalInfo, {}, [
                    className,
                ])}
                gap="32"
            >
                <HStack gap="8">
                    <Avatar
                        src={author.avatar}
                        size={32}
                    />
                    <Text
                        text={author.username}
                        bold
                    />
                    <Text text={createdAt} />
                </HStack>
                <Button onClick={onEdit}>{t('Редактировать')}</Button>
                <Text text={t('{{count}} просмотров', { count: views })} />
            </VStack>
        );
    });
