import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entitites/Counter';
import { userReducer } from 'entitites/User';
import { $API } from 'shared/api/api';
import { To } from 'history';
import { NavigateOptions } from 'react-router';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

// ? Создание такой функции нужно для того, чтобы можно было переиспользовать и пересоздавать store. Это нужно для jest, storybook;
// ? В аргументах функции createReduxStore можно передать store, это так же нужно при использовании с jest, storybook;
export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: To, options?: NavigateOptions) => void,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore({
        reducer: reducerManager.reduce,
        // ? Отключаем девтулзы для прода;
        devTools: __IS_DEV__,
        preloadedState: initialState,
        // ? Для того, чтобы не импортировать инстанс аксиоса в каждый asyncThunk, мы просто его подключаем здесь через extra как middleware. В extraArgument можно передать, что угодно;
        // " Middleware - программный слой, который отрабатывает какие-то действия перед их отправкой в reducer и после их выхода из reducer;
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    api: $API,
                    // ? Добавляем для удобного доступа к навигации useNavigate() из RRD;
                    navigate,
                },
            },
        }),
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
