import {
    CombinedState, Reducer, ReducersMapObject, configureStore,
} from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { $API } from 'shared/api/api';
import { scrollRestorationReducer } from 'features/ScrollRestoration';
import { rtkApi } from 'shared/api/rtkApi';
import { StateSchema, ThunkExtraArgumentsI } from './StateSchema';
import { createReducerManager } from './reducerManager';

// ? Создание такой функции нужно для того, чтобы можно было переиспользовать и пересоздавать store. Это нужно для jest, storybook;
// ? В аргументах функции createReduxStore можно передать store, это так же нужно при использовании с jest, storybook;
export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
        scrollRestoration: scrollRestorationReducer,
        // ? Добавляем RTK Query редьюсеры как обычные, а не асинхронные;
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    // ? Для более удобного взаимодействия с типами;
    const extraArguments: ThunkExtraArgumentsI = {
        api: $API,
    };

    const store = configureStore({

        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        // ? Отключаем девтулзы для прода;
        devTools: __IS_DEV__,
        preloadedState: initialState,
        // ? Для того, чтобы не импортировать инстанс аксиоса в каждый asyncThunk, мы просто его подключаем здесь через extra как middleware. В extraArgument можно передать, что угодно;
        // " Middleware - программный слой, который отрабатывает какие-то действия перед их отправкой в reducer и после их выхода из reducer;
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArguments,
            },
            // ? Добавляем RTK Query API в middleware;
        }).concat(rtkApi.middleware),
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

// ? Вытягиваем тип для dispatch из функции createReduxStore(), обращаясь напрямую к полю dispatch, потом передаём этот тип в хук useAppDispatch;
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

// ! Попытка сделать типизацию для внедрении reducerManager: хотелось убрать ts-ignore, была найдена issues на GH где описана данная проблема и представлены примеры по её решению. Позже вернусь к этому;
// ! Рекомендованная реализация;
// const reducerManager: ReducerManagerI<StateSchema> = createReducerManager({
//     loginForm: loginReducer,
//     counter: counterReducer,
//     user: userReducer,
// });
// ! Рекомендованная реализация;
// const store = configureStore<StateSchema>({
//     reducer: rootReducers,
//     // ? Отключаем девтулзы для прода;
//     devTools: __IS_DEV__,
//     preloadedState: initialState,
//     enhancers: [reducerManager.enhancer],
// });
