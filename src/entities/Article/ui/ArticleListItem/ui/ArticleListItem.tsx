import React, { HTMLAttributeAnchorTarget, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Icon } from 'shared/ui/Icon';
import { Card } from 'shared/ui/Card';
import { Avatar } from 'shared/ui/Avatar';
import { BUTTON_THEME, Button } from 'shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATH } from 'shared/config/routeConfig/routeConfig';
import { AppLink } from 'shared/ui/AppLink';
import {
    ARTICLE_BLOCK_TYPE, ARTICLE_VIEW, ArticleI, ArticleTextBlockI,
} from '../../../model/types/article';
import cls from './ArticleListItem.module.scss';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent';

interface ArticleListItemPropsI {
    className?: string;
    article: ArticleI;
    view: ARTICLE_VIEW;
    target?: HTMLAttributeAnchorTarget;
}
/**
 * Компонента, которая является элементом списка статей, которые отрисовываются в ArticleList;
 * @param className
 * @param article - статья для отрисовки;
 * @param view - тип отображения статьи в списке ArticleList (по-умолчанию SMALL, определено из родительской компоненты), для доступа используется enum ARTICLE_VIEW;
 * @param target - классический атрибут `target` тега `a`;
 */
export const ArticleListItem: React.FC<ArticleListItemPropsI> = ({
    className,
    article,
    view,
    target,
}) => {
    const { t } = useTranslation('article');
    const navigate = useNavigate();

    // const onOpenArticleHandler = useCallback(() => {
    //     navigate(ROUTES_PATH.article_details + article.id);
    // }, [article.id, navigate]);

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
            <Icon
                Svg={EyeIcon}
            />
        </>
    );

    // ? Для доступности и для возможности открывать статьи в новой вкладке добавлена обёртка в виде AppLink;
    if (view === 'BIG') {
        // ? Первый текстовый блок, который будет отображаться в карточке как начальный;
        const textBlock = article.blocks.find((block) => block.type === ARTICLE_BLOCK_TYPE.TEXT) as ArticleTextBlockI;
        return (
            <div
                className={classNames(cls['article-item'], {}, [className, cls[view]])}
            >
                <Card className={cls.card}>
                    <div className={cls.header}>
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
                    </div>
                    <Text
                        text={article.title}
                        className={cls.title}
                    />
                    {
                        types
                    }
                    <img
                        src={article.img}
                        className={cls.image}
                        alt={article.title}
                    />
                    {
                        textBlock
                            ? (
                                <ArticleTextBlockComponent
                                    block={textBlock}
                                    className={cls['text-block']}
                                />
                            )
                            : null
                    }
                    <div className={cls.footer}>
                        <AppLink
                            target={target}
                            to={ROUTES_PATH.article_details + article.id}
                        >
                            <Button
                                theme={BUTTON_THEME.OUTLINE}
                            >
                                {
                                    t('Читать далее...')
                                }
                            </Button>
                        </AppLink>
                        {views}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <AppLink
            target={target}
            to={ROUTES_PATH.article_details + article.id}
            className={classNames(cls['article-item'], {}, [className, cls[view]])}
        >
            <Card
                className={cls.card}
            >
                <div className={cls['image-wrapper']}>
                    <img
                        src={article.img}
                        className={cls.image}
                        alt={article.title}
                    />
                    <Text
                        text={article.createdAt}
                        className={cls.date}
                    />
                </div>
                <div className={cls['info-wrapper']}>
                    {
                        types
                    }
                    {
                        views
                    }
                </div>
                <Text
                    text={article.title}
                    className={cls.title}
                />
            </Card>
        </AppLink>
    );
};
