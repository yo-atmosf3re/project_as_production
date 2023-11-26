/* eslint-disable react/no-array-index-key */
import React, {
    HTMLAttributeAnchorTarget,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text';
import { TEXT_SIZE } from 'shared/ui/Text/ui/Text';
import { ARTICLE_VIEW, ArticleI } from '../../../model/types/article';
import cls from './ArticleList.module.scss';
import { ArticleListItem } from '../../ArticleListItem';
import { ArticleListItemSkeleton } from '../../ArticleListItemSkeleton';

interface ArticleListPropsI {
    className?: string;
    articles: ArticleI[];
    isLoading?: boolean;
    view?: ARTICLE_VIEW;
    target?: HTMLAttributeAnchorTarget;
}

const GET_SKELETONS = (view: ARTICLE_VIEW): JSX.Element[] => (
    new Array(view === ARTICLE_VIEW.SMALL ? 9 : 3)
        .fill(0)
        .map((_, index) => (
            <ArticleListItemSkeleton
                className={cls.card}
                key={index}
                view={view}
            />
        ))
);

/**
 * Компонента, которая отрисовывает список статей;
 * @param className
 * @param articles - массив со статьями;
 * @param isLoading - состояние загрузки;
 * @param view - тип отображения списка со статьями (по-умолчанию SMALL), для доступа используется enum ARTICLE_VIEW;
 * @param target - классический атрибут `target` тега `a`. В нужном месте, где отрисовывается `ArticleList`, можно настроить `target`, который прокидывается в дочерние `ArticleListItem`;
*/
export const ArticleList: React.FC<ArticleListPropsI> = ({
    className,
    articles, isLoading,
    view = ARTICLE_VIEW.SMALL,
    target,
}) => {
    const { t } = useTranslation('article');

    const renderArticle = (article: ArticleI) => (
        <ArticleListItem
            article={article}
            view={view}
            className={cls.card}
            target={target}
            key={article.id}
        />
    );

    if (!isLoading && !articles.length) {
        return (
            <div
                className={classNames(cls['article-list'], {}, [className, cls[view]])}
            >
                <Text
                    title={
                        t('Статьи не найдены!')
                    }
                    size={TEXT_SIZE.L}
                />
            </div>
        );
    }

    return (
        <div
            className={classNames(cls['article-list'], {}, [className, cls[view]])}
        >
            {
                articles.length > 0
                    ? articles.map(renderArticle)
                    : null
            }
            {
                isLoading
                    ? GET_SKELETONS(view)
                    : null
            }
        </div>
    );
};

// ! Закомментированный ниже код относится к реализации с помощью react-virtualized@9.21.21;
// ! Закомментировано потому что ломается работа webpack;
// const ref = useRef() as MutableRefObject<HTMLDivElement>;
// const isBig = view === ARTICLE_VIEW.BIG;
// const itemsPerRow = isBig ? 1 : 3;
// const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow);
// const rowRender = ({
//     index, key, style,
// }: ListRowProps) => {
//     const items = [];
//     const fromIndex = index * itemsPerRow;
//     const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

//     for (let i = fromIndex; i < toIndex; i += 1) {
//         items.push(
//             <ArticleListItem
//                 article={articles[index]}
//                 view={view}
//                 className={cls.card}
//                 target={target}
//                 key={`str${i}`}
//             />,
//         );
//     }

//     return (
//         <div
//             ref={ref}
//             key={key}
//             style={style}
//             className={cls.row}
//         >
//             {
//                 items
//             }
//         </div>
//     );
// };
// return (
//     <WindowScroller
//         onScroll={() => console.log('scroll')}
//         scrollElement={document.getElementById(PAGE_ID) as Element}
//     >
//         {({
//             width, height, registerChild,
//             onChildScroll, isScrolling, scrollTop,
//         }) => (
//             <div
//                 ref={registerChild}
//                 className={classNames(cls['article-list'], {}, [className, cls[view]])}
//             >
//                 <List
//                     height={height ?? 700}
//                     rowCount={rowCount}
//                     rowHeight={isBig ? 700 : 330}
//                     rowRenderer={rowRender}
//                     width={width ? width - 80 : 700}
//                     autoHeight
//                     onScroll={onChildScroll}
//                     isScrolling={isScrolling}
//                     scrollTop={scrollTop}
//                 />
//                 {
//                     isLoading
//                         ? GET_SKELETONS(view)
//                         : null
//                 }
//             </div>
//         )}
//     </WindowScroller>
// );
