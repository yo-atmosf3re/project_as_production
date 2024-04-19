import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    TEXT_ALIGN,
    Text as TextDeprecated,
    TEXT_SIZE,
} from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import EyeIcon from '@/shared/assets/icons/eyeDeprecated.svg';
import CalendarIcon from '@/shared/assets/icons/clarity_date.svg';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { getArticleDetailsError } from '../../../model/selectors/getArticleDetailsError/getArticleDetailsError';
// eslint-disable-next-line max-len
import { getArticleDetailsIsLoading } from '../../../model/selectors/getArticleDetailsIsLoading/getArticleDetailsIsLoading';
import { getArticleDetailsData } from '../../../model/selectors/getArticleDetails/getArticleDetailsData';
import cls from './ArticleDetails.module.scss';
import { fetchArticleById } from '../../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../../model/slice/articleDetailsSlice';
import { renderArticleBlock } from './renderBlock';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface ArticleDetailsPropsI {
    className?: string;
    // ? Т.к id может быть динамическим, то приниматься в компоненту он будет из вне;
    id?: string;
}

const INITIAL_REDUCERS: ReducersList = {
    articleDetails: articleDetailsReducer,
};

const ArticleDetailsDeprecated = () => {
    const article = useSelector(getArticleDetailsData);
    return (
        <>
            <HStack
                justify="center"
                max
                className={cls['avatar-wrapper']}
            >
                <AvatarDeprecated
                    size={200}
                    src={article?.img}
                    className={cls.avatar}
                />
            </HStack>
            <VStack
                gap="4"
                max
                data-testid="ArticleDetails.Info"
            >
                <TextDeprecated
                    className={cls.title}
                    title={article?.title}
                    text={article?.subtitle}
                    size={TEXT_SIZE.L}
                />
                <HStack
                    gap="8"
                    className={cls['article-info']}
                >
                    <IconDeprecated
                        className={cls.icon}
                        Svg={EyeIcon}
                    />
                    <Text text={String(article?.views)} />
                </HStack>
                <HStack
                    gap="8"
                    className={cls['article-info']}
                >
                    <IconDeprecated
                        className={cls.icon}
                        Svg={CalendarIcon}
                    />
                    <Text text={article?.createdAt} />
                </HStack>
            </VStack>
            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};

const ArticleDetailsRedesigned = () => {
    const article = useSelector(getArticleDetailsData);
    return (
        <>
            <Text
                title={article?.title}
                size="l"
                bold
            />
            <Text title={article?.subtitle} />
            <AppImage
                fallback={
                    <Skeleton
                        width="100%"
                        height={420}
                        border="16px"
                    />
                }
                src={article?.img}
                className={cls.image}
            />

            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};

// ? Конкретная статья, которую бекенд отдаёт по id. Берётся id из строки запроса (URL);
export const ArticleDetails: React.FC<ArticleDetailsPropsI> = memo(
    ({ className, id }) => {
        const { t } = useTranslation();
        const dispatch = useAppDispatch();
        const isLoading = useSelector(getArticleDetailsIsLoading);
        const error = useSelector(getArticleDetailsError);

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
                    <SkeletonDeprecated
                        className={cls.avatar}
                        width={200}
                        height={200}
                        border="50%"
                    />
                    <SkeletonDeprecated
                        className={cls.title}
                        width={300}
                        height={32}
                        border="6px"
                    />
                    <SkeletonDeprecated
                        className={cls.skeleton}
                        width={600}
                        height={24}
                        border="6px"
                    />
                    <SkeletonDeprecated
                        className={cls.skeleton}
                        width="100%"
                        height={200}
                        border="6px"
                    />
                    <SkeletonDeprecated
                        className={cls.skeleton}
                        width="100%"
                        height={200}
                        border="6px"
                    />
                </>
            );
            // ? Состояние, если есть ошибка;
        } else if (error) {
            // ? Состояние успешного получения данных;
            content = (
                <TextDeprecated
                    align={TEXT_ALIGN.CENTER}
                    title={t('Произошла ошибка при загрузке статьи.')}
                />
            );
        } else {
            content = (
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={<ArticleDetailsRedesigned />}
                    off={<ArticleDetailsDeprecated />}
                />
            );
        }

        return (
            <DynamicModuleLoader reducers={INITIAL_REDUCERS}>
                <VStack
                    gap="16"
                    max
                    className={classNames(cls['article-details'], {}, [
                        className,
                    ])}
                >
                    {content}
                </VStack>
            </DynamicModuleLoader>
        );
    },
);
