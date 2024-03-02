/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
import { Reducer } from '@reduxjs/toolkit';
import React, { ReactNode, useEffect } from 'react';
import { useStore } from 'react-redux';
import {
    ReduxStoreWithManagerI,
    StateSchema,
    StateSchemaKeyType,
} from '@/app/providers/StoreProvider';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';

// ? Типизация для массива редьюсеров, где ключами будут ключи из StateSchemaKey, а значениями будут Reducer;
// ? UPD: улучшена типизация, теперь нельзя присвоить какой-либо угодно редьюсер в список с редьюсерами - название должно соответствовать значению, потому что теперь TS диманически подставляет нужную часть state в зависимости от названия редьюсера;
export type ReducersList = {
    [name in StateSchemaKeyType]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleLoaderPropsI {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
    children: ReactNode;
}

/**
 * Позволяет использовать RTK-менеджер инкапсулировано, передавая в аргументы этой функции объект с ключом в виде названия редьюсера из `StateSchema` и значением в виде редьюсера, которому пренадлежит данный ключ-имя, а так же флаг, который указывает на то будет ли удаляться редьюсер или нет при размонтировании UI-компоненты;
 *
 * @param reducers - сам редьюсер;
 * @param removeAfterUnmount - удалять редьюсер при размонтировании UI-компоненты, которая обёрнута в DynamicModuleLoader, или нет. По умолчанию `true`;
 */
export const DynamicModuleLoader: React.FC<DynamicModuleLoaderPropsI> = ({
    children,
    reducers,
    removeAfterUnmount = true,
}) => {
    const dispatch = useAppDispatch();
    const store = useStore() as ReduxStoreWithManagerI;

    useEffect(() => {
        // ? Объект с вмонтированными редьюсерами;
        const mountedReducers = store.reducerManager.getMountedReducers();

        // ? Преобразуем объект reducers в массив с массивами, в котором каждый массив будет представлять собой пару ключ-значение из объекта reducers. Затем для каждого такого массива выполняем логику callback'a, который передан в forEach, а именно - работаем с редакс менеджером. Логика по размонтированию редьюсеров работает аналогично;
        Object.entries(reducers).forEach(([name, reducer]) => {
            // ? Находим редьюсер в цикле, возвращаем флаг;
            const mounted = mountedReducers[name as StateSchemaKeyType];
            // ? Выполянем инициализацию только в том случае, если редьюсер ещё не вмонтирован;
            if (!mounted) {
                store.reducerManager.add(name as StateSchemaKeyType, reducer);
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StateSchemaKeyType);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
    }, []);

    return <>{children}</>;
};
