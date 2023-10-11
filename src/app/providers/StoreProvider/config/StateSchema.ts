import {
    ReducersMapObject, AnyAction, CombinedState, Reducer, EnhancedStore,
} from '@reduxjs/toolkit';
import { CounterSchema } from 'entitites/Counter';
import { UserSchema } from 'entitites/User';
import { LoginSchema } from 'features/AuthByUsername';

// ?     Типизация корневного редьюсера;
export interface StateSchema {
    // * Обычные редьюсеры;
    counter: CounterSchema;
    user: UserSchema;
    // * Асинхронные редьюсеры, которые впоследствии будут добавляться с помощью редьюсер-менеджера;
    loginForm?: LoginSchema;
}

// ? Ключи редьюсеров - то есть их названия;
export type StateSchemaKey = keyof StateSchema;

// ? Типизация для редакс-менеджера;
export interface ReducerManagerI {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManagerI extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManagerI;
}
