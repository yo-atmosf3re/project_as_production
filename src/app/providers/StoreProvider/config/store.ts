import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entitites/Counter';
import { userReducer } from 'entitites/User';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

// ? Создание такой функции нужно для того, чтобы можно было переиспользовать и пересоздавать store. Это нужно для jest, storybook;
// ? В аргументах функции createReduxStore можно передать store, это так же нужно при использовании с jest, storybook;
export function createReduxStore(initialState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
    };

    // ! Классическая реализация;
    const reducerManager = createReducerManager(rootReducers);

    // ! Классическая реализация;
    const store = configureStore<StateSchema>({
        reducer: reducerManager.reduce,
        // ? Отключаем девтулзы для прода;
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

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
