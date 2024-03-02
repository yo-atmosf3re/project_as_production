/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, useCallback, useRef } from 'react';

/**
 * Кастомный хук, который позволяет выполнять `callback` с установленным `delay`, но при этом отменяет предыдущий вызов `callback` пока этот самый `callback` не перестанет передаваться каждый новый раз до истечения `delay`;
 * @param callback
 * @param delay
 */
export function useDebouce(callback: (...args: any[]) => void, delay: number) {
    const timer = useRef() as MutableRefObject<any>;

    return useCallback(
        (...args: any[]) => {
            // ? Если таймер существует, то мы отменяем его выполнение, и повторно callback вызван не будет. Если поступает новый callback, то таймер присваевается чуть ниже снова после очистки старого таймера;
            if (timer.current) {
                clearTimeout(timer.current);
            }
            // ? Создаём новый таймер, присваивая рефу setTimeout, внутри которого происходит вызов callback после истечения delay;
            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay],
    );
}
