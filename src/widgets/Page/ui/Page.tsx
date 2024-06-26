import React, {
    MutableRefObject,
    ReactNode,
    memo,
    useRef,
    UIEvent,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ModsType, classNames } from '@/shared/lib/classNames/classNames';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    getScrollRestorationByPath,
    scrollRestorationActions,
} from '@/features/ScrollRestoration';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { ARTICLE_VIEW } from '@/shared/const/consts';
import cls from './Page.module.scss';
import { TestPropsI } from '@/shared/types/tests';
import { toggleFeatures } from '@/shared/lib/features';

interface PagePropsI extends TestPropsI {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
    viewType?: ARTICLE_VIEW;
}

export const PAGE_ID = 'PAGE_ID';

/**
 * Компонента-обёртка для контентной части, чтобы инкапсулировать контентные стили, обернуть в семантический тег. Исключает использование контентных стилей на всё приложение, делая их модульными. Содержит в себе логику по контролю скролла;
 * @param className
 * @param children - содержимое, которое представляет из себя компоненту-страницу из сущности pages;
 * @param onScrollEnd - коллбэк, который передаётся в кастомный хук `useInfiniteScroll`, чтобы была возможность отрабатывать какую-либо логику при пересечении элементов в области видимости пользователя;
 * @return `children`
 */
export const Page: React.FC<PagePropsI> = memo(
    ({ className, children, onScrollEnd, ...otherProps }) => {
        const mods: ModsType = {};
        const additionalClasses = [className];

        // ? Ссылка на section;
        const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
        // ? Ссылка на невидимый для пользователя div, которая будет отрабатывать при появлении блока в области видимости пользователя и которая будет вызывать callback;
        const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
        const dispatch = useAppDispatch();
        const { pathname } = useLocation();
        const scrollPosition = useSelector((state: StateSchema) =>
            getScrollRestorationByPath(state, pathname),
        );

        useInfiniteScroll({
            triggerRef,
            wrapperRef: toggleFeatures({
                name: 'isAppRedesigned',
                on: () => undefined,
                off: () => wrapperRef,
            }),
            callback: onScrollEnd,
        });

        useInitialEffect(() => {
            wrapperRef.current.scrollTop = scrollPosition;
        });

        // ? Сохраняем данные о скролле в стейт;
        const onScrollHandler = useThrottle((e: UIEvent<HTMLDivElement>) => {
            dispatch(
                scrollRestorationActions.setScrollPosition({
                    position: e.currentTarget.scrollTop,
                    // ? В качестве пути используем часть URL-пути, которое начинается с "/";
                    path: pathname,
                }),
            );
        }, 500);

        const toggleClasses = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls['page-redesigned'],
            off: () => cls['page-wrapper'],
        });

        return (
            <main
                className={classNames(toggleClasses, mods, additionalClasses)}
                ref={wrapperRef}
                onScroll={onScrollHandler}
                id={PAGE_ID}
                data-testid={otherProps['data-testid'] ?? 'Page'}
            >
                {children}
                {onScrollEnd ? (
                    <div
                        className={cls.trigger}
                        ref={triggerRef}
                    />
                ) : null}
            </main>
        );
    },
);
