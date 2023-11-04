import { useCallback, useRef } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Кастомный хук обеспечивающий выполнение `callback` с определённой задержкой для исключения слишком частого вызова этого самого `callback`;
 * @param callback
 * @param delay - задержка в ms для `setTimeout` внутри хука;
 * @returns `() => void`
 */
export function useThrottle(callback: (...arg: any[]) => void, delay: number) {
    // ? Объявляем переменную с сылкой на флаг;
    const throttleRef = useRef(false);
    return useCallback((...arg: any[]) => {
        if (!throttleRef.current) {
            // ? Функция-callback, переданная в аргументе хука, вызывается только в случае ложного значения ссылки throttleRef;
            callback(...arg);
            // ? После вызова callback меняем флаг на true;
            throttleRef.current = true;

            // ? Запускается таймер, заданное время которого опеределяется аргументом delay. За это время callback не вызывается, пока флаг с ссылкой снова не станет false;
            setTimeout(() => {
                throttleRef.current = false;
            }, delay);
        }
    }, [callback, delay]);
}
