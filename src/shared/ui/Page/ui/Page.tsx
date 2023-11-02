import React, {
    MutableRefObject, ReactNode, memo, useRef,
} from 'react';
import { ModsType, classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import cls from './Page.module.scss';

interface PagePropsI {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

/**
 * Компонента-обёртка, входящая в комплект UI-kit проекта, для контентной части, чтобы инкапсулировать контентные стили, обернуть в семантический тег. Исключает использование контентных стилей на всё приложение, делая их модульными. Содержит в себе логику по контролю скролла;
 * @param className
 * @param children - содержимое, которое представляет из себя компоненту-страницу из сущности pages;
 * @param onScrollEnd - коллбэк, который передаётся в кастомный хук `useInfiniteScroll`, чтобы была возможность отрабатывать какую-либо логику при пересечении элементов в области видимости пользователя;
 * @return `children`
 */
export const Page: React.FC<PagePropsI> = memo(({
    className, children, onScrollEnd,
}) => {
    const mods: ModsType = {};
    const additionalClasses = [className];

    // ? Ссылка на section;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    // ? Ссылка на невидимый для пользователя div, которая будет отрабатывать при появлении блока в области видимости пользователя и которая будет вызывать callback;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    return (
        <section
            className={classNames(cls['page-wrapper'], mods, additionalClasses)}
            ref={wrapperRef}
        >
            {
                children
            }
            <div
                ref={triggerRef}
            />
        </section>
    );
});
