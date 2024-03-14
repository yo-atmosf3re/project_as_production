import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';

type SelectorType<T, Args extends any[]> = (state: StateSchema, ...args: Args) => T;

type Hook<T, Args extends any[]> = (...args: Args) => T;

type ResultType<T, Args extends any[]> = [Hook<T, Args>, SelectorType<T, Args>];

/**
 * Функция, которая оборачивает принимаемый аргумент `selector` в хук useSelector, а затем возвращает кортеж, где первый элемент - `useSelectorHook` - функция, которая возвращает обёрнутый в useSelector `selector`, а второй аргумент - сам `selector`;
 * @param selector
 */
export function buildSelector<T, Args extends any[]>(selector: SelectorType<T, Args>): ResultType<T, Args> {
    const useSelectorHook: Hook<T, Args> = (...args: Args) => {
        return useSelector((state: StateSchema ) => selector(state, ...args));
    };

    return [useSelectorHook, selector];
}
