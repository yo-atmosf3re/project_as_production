import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { SliceCaseReducers, CreateSliceOptions } from '@reduxjs/toolkit/dist';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

// ? В дженериках самой функции buildSlice такую же типизацию как и в дженериках функции createSlice;
/**
 * Функция, которая создаёт слайс, привязывает экшены к диспатчам. Упрощает работу со слайсами: вызов функции `useDispatch` и оборачивание всех экшенов в `useDispatch`, создание слайса и его привязка происходят в данной функции, а на выходе получается объект, который возвращает хук `useActions`, внутри которого слайсы;
 */
export function buildSlice<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string
>(
    options: CreateSliceOptions<State, CaseReducers, Name>,
) {
    // ? Создание самого слайса. В аргументы функции передаются опции, т.е это проксирование для сохранения правильной типизации;
    const slice = createSlice(options);

    // ? Функция, которая оборачивает внутри себя все экшены в диспатч: биндит с помощью функции bindActionsCreators слайсы и диспатч и возвращает мемоизированное значение (применение typeof и @ts-ignore нужно для поддержки нужной типизации);
    const useActions = (): typeof slice.actions => {
        const dispatch = useDispatch();

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return useMemo(
            () => bindActionCreators(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                slice.actions,
                dispatch,
            ),
            [dispatch],
        );
    };

    return {
        ...slice,
        useActions,
    };
}
