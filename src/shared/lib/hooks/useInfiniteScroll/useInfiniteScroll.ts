import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptionsI {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef: MutableRefObject<HTMLElement>;
}

/**
 * Кастомный хук, внутри которого логика по бесконечному скроллу;
 * @param callback - коллбэк, который вызывается в тот момент, когда пересекается тот или иной элемент;
 * @param triggerRef - реф, на который нужно будет триггерится, чтобы вызвать `callback`;
 * @param wrapperRef - реф на оболчку, внутри которой находится сам скролл (будет использоваться на скролле компоненты `Page`, но может использоваться и на глобальном скролле, на любой компоненте со скроллом);
 */
export function useInfiniteScroll({
    callback,
    wrapperRef,
    triggerRef,
}: UseInfiniteScrollOptionsI) {
    const observer = useRef<IntersectionObserver | null>(null);

    // ? Использование *Intersection Observer API;
    useEffect(() => {
        const wrapperElement = wrapperRef.current;
        const triggerElement = triggerRef.current;

        if (callback) {
            const options = {
                // ? В качества корневого элемента передаём оболочку (это может быть Page, либо глобальный скролл, на любой компоненте со скроллом);
                root: wrapperElement,
                rootMargin: '0px',
                threshold: 1.0,
            };

            observer.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.current.observe(triggerElement);
        }

        return () => {
            if (observer.current && triggerElement) {
                // ? Очищаем useEffect и дизейблим проверку eslinta, потому что ссылка на triggerRef.current не будет изменяться;
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.current.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}

// " *Intersection Observer API - средство для отслеживания пересечения элементов на странице с определенной областью просмотра. Уведомляет JS-код в том случае, когда элемент появляется/удаляется в/из области видимости просмотра пользователя. Полезно для кейсов с  оптимизацией: лэйзи лоудинг изображений, инфинити скролл, отчёты о рекламе, запуск анимаций. Краткий принцип работы: создаётся экземпляр класса, который принимает коллбэк-функцию, набор опций для настройки поведения, затем в коллбэке определяется логика, которая будет выполнена при пересечении элементов с областью видимости просмотра, после - наблюдение начинается, вызвав метод observe() экземпляра класса, передав ему элемент или список элементов, которые нужно отслеживать, далее, при пересечении, вызывается коллбэк с массивом объектов, содержащих информацию о каждом элементе (пересечение, область просмотра). Преимущество IO API в том, что он позволяет отслеживать элементы, не привязываясь к событиям прокрутки или изменению размера окна, это сильно улучшает производительность и эффективность кода;
