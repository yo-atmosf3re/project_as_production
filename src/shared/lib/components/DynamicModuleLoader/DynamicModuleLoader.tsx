/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManagerI } from 'app/providers/StoreProvider';
import { StateSchemaKeyType } from 'app/providers/StoreProvider/config/StateSchema';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

// ? Типизация для массива редьюсеров, где ключами будут ключи из StateSchemaKey, а значениями будут Reducer;
export type ReducersList = {
    [keyReducer in StateSchemaKeyType]?: Reducer;
}

/**
 * Позволяет использовать RTK-менеджер инкапсулировано, передавая в аргументы этой функции объект с ключём в виде названия редьюсера из StateSchema и значением в виде редьюсера, которому пренадлежит данный ключ-имя, а так же флаг, который указывает на то будет ли удаляться редьюсер или нет при размонтировании UI-компоненты;
 *
 * @param reducers - сам редьюсер;
 * @param removeAfterUnmount - удалять редьюсер при размонтировании UI-компоненты, которая обёрнута в DynamicModuleLoader, или нет;
 */
interface DynamicModuleLoaderPropsI {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
    children?: ReactNode;
}

// ? Компонента-обёртка для того, чтобы была возможность инкапсулировать логику с внедрением асинхронных редьюсеров. Удобная возможность при указании всего лишь двух пропсов использовать редакс менеджер;
export const DynamicModuleLoader: React.FC<DynamicModuleLoaderPropsI> = ({
    children, reducers, removeAfterUnmount,
}) => {
    const dispatch = useDispatch();
    const store = useStore() as ReduxStoreWithManagerI;
    useEffect(() => {
        // ? Преобразуем объект reducers в массив с массивами, в котором каждый массив будет представлять собой пару ключ-значение из объекта reducers. Затем для каждого такого массива выполняем логику callback'a, который передан в forEach, а именно - работаем с редакс менеджером. Логика по размонтированию редьюсеров работает аналогично;
        Object.entries(reducers)
            .forEach(([keyReducer, reducer]) => {
                store.reducerManager.add(keyReducer as StateSchemaKeyType, reducer);
                dispatch({ type: `@INIT ${keyReducer} reducer` });
            });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers)
                    .forEach(([keyReducer]) => {
                        dispatch({ type: `@DESTROY ${keyReducer} reducer` });
                        store.reducerManager.remove(keyReducer as StateSchemaKeyType);
                    });
            }
        };
    }, []);
    return (
        <>
            {
                children
            }
        </>
    );
};
