import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';

type SelectorType<T> = (state: StateSchema) => T;

type ResultType<T> = [() => T, SelectorType<T>];

/**
 * Функция, которая оборачивает принимаемый аргумент `selector` в хук useSelector, а затем возвращает кортеж, где первый элемент - `useSelectorHook` - функция, которая возвращает обёрнутый в useSelector `selector`, а второй аргумент - сам `selector`;
 * @param selector
 */
export function buildSelector<T>(selector: SelectorType<T>): ResultType<T> {
    const useSelectorHook = () => {
        return useSelector(selector);
    };

    return [useSelectorHook, selector];
}
