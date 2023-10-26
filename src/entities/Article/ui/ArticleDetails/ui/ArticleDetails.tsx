import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { TEXT_ALIGN, Text } from 'shared/ui/Text';
import { Skeleton } from 'shared/ui/Skeleton';
import { Avatar } from 'shared/ui/Avatar';
import EyeIcon from 'shared/assets/icons/eye.svg';
import CalendarIcon from 'shared/assets/icons/clarity_date.svg';
import { TEXT_SIZE } from 'shared/ui/Text/ui/Text';
import { Icon } from 'shared/ui/Icon';
import { ARTICLE_BLOCK_TYPE, ArticleBlockI } from '../../../model/types/article';
import { getArticleDetailsError } from '../../../model/selectors/getArticleDetailsError/getArticleDetailsError';
import { getArticleDetailsIsLoading }
    from '../../../model/selectors/getArticleDetailsIsLoading/getArticleDetailsIsLoading';
import cls from './ArticleDetails.module.scss';
import { fetchArticleById } from '../../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../../model/slice/articleDetailsSlice';
import { getArticleDetailsData } from '../../../model/selectors/getArticleDetails/getArticleDetailsData';
import { ArticleCodeBlockComponent } from '../../ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../../ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent';

interface ArticleDetailsPropsI {
    className?: string;
    // ? Т.к id может быть динамическим, то приниматься в компоненту он будет из вне;
    id: string;
}

const INITIAL_REDUCERS: ReducersList = {
    articleDetails: articleDetailsReducer,
};

// ? Конкретная статья, которую бекенд отдаёт по id. Берётся id из строки запроса (URL);
export const ArticleDetails: React.FC<ArticleDetailsPropsI> = memo(({
    className, id,
}) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);
    const article = useSelector(getArticleDetailsData);

    // ? Декомпозиция блоков: в зависимости от типа блока будет возвращаться нужная компонента. Затем, этот коллбэк попадает в функцию map (article?.blocks.map(renderBlock)), где каждый элемент blocks будет попадать в этот коллбэк и будет отрисовываться нужный блок пока не закончатся элементы в массиве blocks;
    const renderBlock = useCallback((block: ArticleBlockI) => {
        switch (block.type) {
        case ARTICLE_BLOCK_TYPE.CODE:
            return (
                <ArticleCodeBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        case ARTICLE_BLOCK_TYPE.IMAGE:
            return (
                <ArticleImageBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        case ARTICLE_BLOCK_TYPE.TEXT:
            return (
                <ArticleTextBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        default:
            return null;
        }
    }, []);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    // ? Переменная контент нужна для более удобного условного рендера;
    let content;

    // ? Состояние загрузки;
    if (isLoading) {
        content = (
            <>
                <Skeleton
                    className={cls.avatar}
                    width={200}
                    height={200}
                    border="50%"
                />
                <Skeleton
                    className={cls.title}
                    width={300}
                    height={32}
                    border="6px"
                />
                <Skeleton
                    className={cls.skeleton}
                    width={600}
                    height={24}
                    border="6px"
                />
                <Skeleton
                    className={cls.skeleton}
                    width="100%"
                    height={200}
                    border="6px"
                />
                <Skeleton
                    className={cls.skeleton}
                    width="100%"
                    height={200}
                    border="6px"
                />
            </>
        );
        // ? Состояние, если есть ошибка;
    } else if (error) {
        content = (
            <Text
                align={TEXT_ALIGN.CENTER}
                title={
                    t('Произошла ошибка при загрузке статьи.')
                }
            />
        );
        // ? Состояние успешного получения данных;
    } else {
        content = (
            <>
                <div
                    className={cls['avatar-wrapper']}
                >
                    <Avatar
                        size={200}
                        src={article?.img}
                        className={cls.avatar}
                    />
                </div>
                <Text
                    className={cls.title}
                    title={article?.title}
                    text={article?.subtitle}
                    size={TEXT_SIZE.L}
                />
                <div
                    className={cls['article-info']}
                >
                    <Icon
                        className={cls.icon}
                        Svg={EyeIcon}
                    />
                    <Text
                        text={String(article?.views)}
                    />
                </div>
                <div
                    className={cls['article-info']}
                >
                    <Icon
                        className={cls.icon}
                        Svg={CalendarIcon}
                    />
                    <Text
                        text={article?.createAt}
                    />
                </div>
                {
                    article?.blocks.map(renderBlock)
                }
            </>
        );
    }

    return (
        <DynamicModuleLoader
            reducers={INITIAL_REDUCERS}
        >
            <div
                className={classNames(cls['article-details'], {}, [className])}
            >
                {
                    content
                }
            </div>
        </DynamicModuleLoader>
    );
});
