import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '../../ArticleListItem.module.scss';
import { ArticleListItemPropsI } from '../../ArticleListItem';
import EyeIcon from '@/shared/assets/icons/eyeDeprecated.svg';
import { Text } from '@/shared/ui/deprecated/Text';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Card } from '@/shared/ui/deprecated/Card';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { BUTTON_THEME, Button } from '@/shared/ui/deprecated/Button';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { HStack } from '@/shared/ui/redesigned/Stack';
import {
    ARTICLE_BLOCK_TYPE,
    getRouteArticleDetails,
} from '@/shared/const/consts';
import { ArticleTextBlockI } from '../../../../../model/types/article';
import { ArticleTextBlockComponent } from '../../../../ArticleTextBlockComponent';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

/**
 *  Описания и пропсы аналогичны компоненте `ArticleListItem`;
 * @deprecated
 */
export const ArticleListItemDeprecated: React.FC<ArticleListItemPropsI> = memo(
    ({ className, article, view, target }) => {
        const { t } = useTranslation('article');

        const types = (
            <Text
                text={article.type.join(', ')}
                className={cls.types}
            />
        );

        const views = (
            <>
                <Text
                    text={String(article.views)}
                    className={cls.views}
                />
                <Icon Svg={EyeIcon} />
            </>
        );

        // ? Для доступности и для возможности открывать статьи в новой вкладке добавлена обёртка в виде AppLink;
        if (view === 'BIG') {
            // ? Первый текстовый блок, который будет отображаться в карточке как начальный;
            const textBlock = article.blocks.find(
                (block) => block.type === ARTICLE_BLOCK_TYPE.TEXT,
            ) as ArticleTextBlockI;

            return (
                <div
                    data-testid="ArticleListItem"
                    className={classNames(cls['article-item'], {}, [
                        className,
                        cls[view],
                    ])}
                >
                    <Card className={cls.card}>
                        <HStack align="center">
                            <Avatar
                                size={30}
                                src={article.user.avatar}
                            />
                            <Text
                                text={article.user.username}
                                className={cls.username}
                            />
                            <Text
                                text={article.createdAt}
                                className={cls.date}
                            />
                        </HStack>
                        <Text
                            text={article.title}
                            className={cls.title}
                        />
                        {types}
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
                        {textBlock ? (
                            <ArticleTextBlockComponent
                                block={textBlock}
                                className={cls['text-block']}
                            />
                        ) : null}
                        <HStack
                            className={cls.footer}
                            align="center"
                            gap="16"
                        >
                            <AppLink
                                target={target}
                                to={getRouteArticleDetails(article.id)}
                            >
                                <Button theme={BUTTON_THEME.OUTLINE}>
                                    {t('Читать далее...')}
                                </Button>
                            </AppLink>
                            {views}
                        </HStack>
                    </Card>
                </div>
            );
        }

        return (
            <AppLink
                data-testid="ArticleListItem"
                target={target}
                to={getRouteArticleDetails(article.id)}
                className={classNames(cls['article-item'], {}, [
                    className,
                    cls[view],
                ])}
            >
                <Card className={cls.card}>
                    <div className={cls['image-wrapper']}>
                        <AppImage
                            fallback={
                                <Skeleton
                                    width="100%"
                                    height={200}
                                />
                            }
                            src={article.img}
                            className={cls.image}
                            alt={article.title}
                        />
                        <Text
                            text={article.createdAt}
                            className={cls.date}
                        />
                    </div>
                    <HStack
                        className={cls['info-wrapper']}
                        align="center"
                    >
                        {types}
                        {views}
                    </HStack>
                    <Text
                        text={article.title}
                        className={cls.title}
                    />
                </Card>
            </AppLink>
        );
    },
);
