import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItemRedesigned.module.scss';
import { ArticleListItemPropsI } from '../../ArticleListItem';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleTextBlockI } from '../../../../../model/types/article';
import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import {
    ARTICLE_BLOCK_TYPE,
    getRouteArticleDetails,
} from '@/shared/const/consts';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button } from '@/shared/ui/redesigned/Button';
import EyeIcon from '@/shared/assets/icons/eye.svg';

/**
 *  Описания и пропсы аналогичны компоненте `ArticleListItem`;
 * @param className
 */
export const ArticleListItemRedesigned: React.FC<ArticleListItemPropsI> = memo(
    ({ className, article, view, target }) => {
        const { t } = useTranslation();

        const userInfo = (
            <>
                <Avatar
                    size={32}
                    src={article.user.avatar}
                    className={cls.avatar}
                />
                <Text
                    bold
                    text={article.user.username}
                />
            </>
        );

        const views = (
            <HStack gap="8">
                <Icon Svg={EyeIcon} />
                <Text
                    text={String(article.views)}
                    className={cls.views}
                />
            </HStack>
        );

        // ? Для доступности и для возможности открывать статьи в новой вкладке добавлена обёртка в виде AppLink;
        if (view === 'BIG') {
            // ? Первый текстовый блок, который будет отображаться в карточке как начальный;
            const textBlock = article.blocks.find(
                (block) => block.type === ARTICLE_BLOCK_TYPE.TEXT,
            ) as ArticleTextBlockI;

            return (
                <Card
                    max
                    padding="24"
                    data-testid="ArticleListItem"
                    className={classNames(cls['article-item'], {}, [
                        className,
                        cls[view],
                    ])}
                >
                    <VStack gap="16">
                        <HStack
                            gap="8"
                            max
                        >
                            {userInfo}
                            <Text text={article.createdAt} />
                        </HStack>
                        <Text
                            bold
                            text={article.title}
                        />
                        <Text
                            text={article.subtitle}
                            size="s"
                        />
                        <AppImage
                            fallback={
                                <Skeleton
                                    width={200}
                                    height={200}
                                />
                            }
                            src={article.img}
                            className={cls.image}
                            alt={article.title}
                        />
                        {textBlock?.paragraphs ? (
                            <Text
                                text={textBlock.paragraphs
                                    .slice(0, 2)
                                    .join(' ')}
                                className={cls['text-block']}
                            />
                        ) : null}
                        <HStack
                            max
                            justify="between"
                        >
                            <AppLink
                                target={target}
                                to={getRouteArticleDetails(article.id)}
                            >
                                <Button variant="outline">
                                    {t('Читать далее...')}
                                </Button>
                            </AppLink>
                            {views}
                        </HStack>
                    </VStack>
                </Card>
            );
        }

        return (
            <AppLink
                data-testid="ArticleListItem"
                target={target}
                to={getRouteArticleDetails(article.id)}
                className={classNames(cls['list-redesigned'], {}, [
                    className,
                    cls[view],
                ])}
            >
                <Card
                    className={cls.card}
                    border="round"
                    padding="0"
                >
                    <AppImage
                        fallback={
                            <Skeleton
                                width="100%"
                                height={200}
                            />
                        }
                        alt={article.title}
                        src={article.img}
                        className={cls.image}
                    />
                    <VStack
                        className={cls.info}
                        gap="4"
                    >
                        <Text
                            title={article.title}
                            className={cls.title}
                        />
                        <VStack
                            gap="4"
                            className={cls.footer}
                            max
                        >
                            <HStack
                                justify="between"
                                max
                            >
                                <Text
                                    text={article.createdAt}
                                    className={cls.date}
                                />
                                {views}
                            </HStack>
                            <HStack gap="4">{userInfo}</HStack>
                        </VStack>
                    </VStack>
                </Card>
            </AppLink>
        );
    },
);
