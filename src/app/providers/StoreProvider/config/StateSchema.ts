import {
    ReducersMapObject, AnyAction, CombinedState, Reducer, EnhancedStore,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { CounterSchema } from 'entitites/Counter';
import { ProfileSchema } from 'entitites/Profile';
import { UserSchema } from 'entitites/User';
import { LoginSchema } from 'features/AuthByUsername';
import { To } from 'history';
import { NavigateOptions } from 'react-router';

// ? Типизация корневного редьюсера;
export interface StateSchema {
    // * Обычные редьюсеры;
    counter: CounterSchema;
    user: UserSchema;
    // * Асинхронные редьюсеры, которые впоследствии будут добавляться с помощью редьюсер-менеджера;
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
}

// ? Ключи редьюсеров - то есть их названия;
export type StateSchemaKeyType = keyof StateSchema;

// ? Типизация для редакс-менеджера;
export interface ReducerManagerI {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKeyType, reducer: Reducer) => void;
    remove: (key: StateSchemaKeyType) => void;
}

// ? Расширяем типизацию для редеакс стора совместно с reducerManager;
export interface ReduxStoreWithManagerI extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManagerI;
}

// ? Типизация для extra, которые добавлены в качестве middleware для asyncThunk;
export interface ThunkExtraArgumentsI {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;
}

// ? ;
export interface ThunkConfigI<T> {
    rejectValue: T;
    extra: ThunkExtraArgumentsI;
}
