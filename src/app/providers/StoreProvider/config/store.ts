import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entitites/Counter';
import { StateSchema } from './StateSchema';

// ? Создание такой функции нужно для того, чтобы можно было переиспользовать и пересоздавать store. Это нужно для jest, storybook;
// ? В аргументах функции createReduxStore можно передать store, это так же нужно при использовании с jest, storybook;
export function createReduxStore(initialState?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: {
            counter: counterReducer,
        },
        // ? Отключаем девтулзы для прода;
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
