import {
    ReducersMapObject, AnyAction, CombinedState, Reducer, EnhancedStore,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entities/Article';
import { CounterSchema } from 'entities/Counter';
import { ProfileSchema } from 'entities/Profile';
import { UserSchema } from 'entities/User';
import { AddCommentFormSchema } from 'features/AddCommentForm';
import { LoginSchema } from 'features/AuthByUsername';
import { ScrollRestorationSchema } from 'features/ScrollRestoration';
import { ArticleDetailsPageSchema }
    from 'pages/ArticleDetailsPage';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { rtkApi } from 'shared/api/rtkApi';

// ? Типизация корневного редьюсера;
export interface StateSchema {
    // * Обычные редьюсеры;
    counter: CounterSchema;
    user: UserSchema;
    scrollRestoration: ScrollRestorationSchema;
    // ? Типизация для редьюсеров, добавленных с помощью RTK Query;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    // * Асинхронные редьюсеры, которые впоследствии будут добавляться с помощью редьюсер-менеджера;
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    addCommentForm?: AddCommentFormSchema;
    articlesPage?: ArticlesPageSchema;
    articleDetailsPage?: ArticleDetailsPageSchema;
}

// ? Ключи редьюсеров - то есть их названия;
export type StateSchemaKeyType = keyof StateSchema;

export type MountedReducersType = OptionalRecord<StateSchemaKeyType, boolean>;

// ? Типизация для редакс-менеджера;
export interface ReducerManagerI {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKeyType, reducer: Reducer) => void;
    remove: (key: StateSchemaKeyType) => void;
    getMountedReducers: () => MountedReducersType;
}

// ? Расширяем типизацию для редеакс стора совместно с reducerManager;
export interface ReduxStoreWithManagerI extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManagerI;
}

// ? Типизация для extra, которые добавлены в качестве middleware для asyncThunk;
export interface ThunkExtraArgumentsI {
    api: AxiosInstance;
    // navigate?: (to: To, options?: NavigateOptions) => void;
}

// ? Тип для конфигурации createAsyncThunk, который указывается в дженериках этой функции;
export interface ThunkConfigI<T> {
    rejectValue: T;
    extra: ThunkExtraArgumentsI;
    state: StateSchema;
}
