import React, {
    MutableRefObject, ReactNode, memo, useRef,
    UIEvent,
} from 'react';
import { ModsType, classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getScrollRestorationByPath, scrollRestorationActions } from 'features/ScrollRestoration';
import { useLocation } from 'react-router-dom';
import { StateSchema } from 'app/providers/StoreProvider';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
import { ARTICLE_VIEW } from 'entities/Article';
import cls from './Page.module.scss';

interface PagePropsI {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
    viewType?: ARTICLE_VIEW;
}

/**
 * Компонента-обёртка для контентной части, чтобы инкапсулировать контентные стили, обернуть в семантический тег. Исключает использование контентных стилей на всё приложение, делая их модульными. Содержит в себе логику по контролю скролла;
 * @param className
 * @param children - содержимое, которое представляет из себя компоненту-страницу из сущности pages;
 * @param onScrollEnd - коллбэк, который передаётся в кастомный хук `useInfiniteScroll`, чтобы была возможность отрабатывать какую-либо логику при пересечении элементов в области видимости пользователя;
 * @param viewType - тип отображения статей, в зависимости от типа условно определяются классы scss для блока-триггера. Для BIG блок-триггер имеет некоторые размера, а для SMALL класс стилей отсутствует вовсе. Это нужно для более плавного и своевременного отклика `IO Observable`, который используется в `useInfiniteScroll` (такое решение может быть временным);
 * @return `children`
 */
export const Page: React.FC<PagePropsI> = memo(({
    className, children, onScrollEnd, viewType,
}) => {
    const mods: ModsType = {};
    const additionalClasses = [className];

    // ? Ссылка на section;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    // ? Ссылка на невидимый для пользователя div, которая будет отрабатывать при появлении блока в области видимости пользователя и которая будет вызывать callback;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector(
        (state: StateSchema) => getScrollRestorationByPath(state, pathname),
    );

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    // ? Сохраняем данные о скролле в стейт;
    const onScrollHandler = useThrottle((e: UIEvent<HTMLDivElement>) => {
        console.log('Scroll');
        dispatch(scrollRestorationActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            // ? В качестве пути используем часть URL-пути, которое начинается с "/";
            path: pathname,
        }));
    }, 500);

    return (
        <section
            className={classNames(cls['page-wrapper'], mods, additionalClasses)}
            ref={wrapperRef}
            onScroll={onScrollHandler}
        >
            {
                children
            }
            {
                onScrollEnd
                    ? (
                        // ! Старый вариант, после закомментированного кода описан новый, который будет в дальнейшем протестирован;
                        // <div
                        // className={viewType === ARTICLE_VIEW.BIG ? cls.trigger : ''}
                        // ref={triggerRef}
                        //     className={cls.trigger}
                        //     ref={triggerRef}
                        // />
                        <div
                            className={cls.trigger}
                            ref={triggerRef}
                        />
                    )
                    : null
            }
        </section>
    );
});
