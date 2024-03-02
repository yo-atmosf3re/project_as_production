import { ReducersMapObject, combineReducers } from '@reduxjs/toolkit';
import {
    MountedReducersType,
    ReducerManagerI,
    StateSchema,
    StateSchemaKeyType,
} from './StateSchema';

// ? Функция-менеджер для редьюсеров, нужна для code splitting;
export function createReducerManager(
    initialReducers: ReducersMapObject<StateSchema>,
): ReducerManagerI {
    // ? Создаём копию объекта, значения которого соответствуют различным функциям-редьюсерам;
    const reducers = { ...initialReducers };

    // ? Объединяем редьюсеры;
    let combinedReducer = combineReducers(reducers);

    // ? Массив, который содержит названия редьюсеров. StateSchemaKey это keyof StateSchem'ы. В этом массиве содержатся ключи на удаление;
    let keysToRemove: StateSchemaKeyType[] = [];

    const mountedReducers: MountedReducersType = {};

    return {
        // ? Возвращает текущий объект с редьюсерами;
        getReducerMap: () => reducers,

        // ! Да, это слегка дублирует функционал getReducerMap, но да ладно, тут можно использовать и такой кейс, ничего страшного;
        // ? Возвращает объект с проинициализированными и вмонтированными редьюсерами;
        getMountedReducers: () => mountedReducers,

        // ? Удаляет редьюсеры, если массив с ключами содержит ключи. Копирует стейт, затем, если в стейте содержатся редьюсеры, ключи которых есть в keysToRemove, то удаляет их, а затем очищает массив keysToRemove после всего цицла forEach. Если ключей на удаление нет, то применяет combinedReducer() с переданным в reduce state и action;
        reduce: (state, action) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                keysToRemove.forEach((key) => {
                    delete state[key];
                });
                keysToRemove = [];
            }

            return combinedReducer(state, action);
        },

        // ? Добавляет новый редьюсер в объект с редьюсерами, пересоздаёт combinedReducer с учётом новых редьюсеров, при их наличии. Если key не существует и такой редьюсер по ключу уже есть в reducers, то функция не отрабатывает, попадая в if;
        add: (key, reducer) => {
            if (!key || reducers[key]) {
                return;
            }

            reducers[key] = reducer;
            mountedReducers[key] = true;
            combinedReducer = combineReducers(reducers);
        },

        // ? Удаляет редьюсер по ключу, добавляет ключ удалённого редьюсера в массив с удалёнными ключами, обновляет combinedReducer с новым reducers. Если key не существует и такого редьюсера по ключу в reducers нет, то функция не отрабатывает, попадая в if;
        remove: (key) => {
            if (!key || !reducers[key]) {
                return;
            }

            delete reducers[key];
            keysToRemove.push(key);
            mountedReducers[key] = false;
            combinedReducer = combineReducers(reducers);
        },
    };
}

// ! Попытка сделать типизацию для внедрении reducerManager;
// ! Типизация для рекомендуемой реализации;
// export interface ReducerManagerI<State> {
//     getReducerMap: () => ReducersMapObject<StateSchema>;
//     reduce: Reducer<CombinedState<State>>;
//     add: <K extends keyof State>(key: K, reducer: Reducer<Exclude<State[K], undefined>>) => void;
//     remove: (key: StateSchemaKey) => void;
//     enhancer: StoreEnhancer<{ reducerManager: ReducerManagerI<State> }>;
// }
// ! Рекомендованная реализация;
// const reducerManager: ReducerManagerI<StateSchema> = {
//     // ? Возвращает текущий объект с редьюсерами;
//     getReducerMap: () => reducers,

//     reduce: (state, action) => {
//         if (keysToRemove.length > 0) {
//             state = { ...state };
//             keysToRemove.forEach((key) => {
//                 delete state[key];
//             });
//             keysToRemove = [];
//         }

//         return combinedReducer(state, action);
//     },

//     // ? Добавляет новый редьюсер в объект с редьюсерами, пересоздаёт combinedReducer с учётом новых редьюсеров, при их наличии. Если key не существует и такой редьюсер по ключу уже есть в reducers, то функция не отрабатывает, попадая в if;
//     add: (key, reducer) => {
//         if (!key || reducers[key]) {
//             return;
//         }

//         // ! Рекомендация от разработчиков RTK использовать в этом месте as any;
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         reducers[key] = reducer as any;
//         combinedReducer = combineReducers(reducers);
//     },

//     // ? Удаляет редьюсер по ключу, добавляет ключ удалённого редьюсера в массив с удалёнными ключами, обновляет combinedReducer с новым reducers. Если key не существует и такого редьюсера по ключу в reducers нет, то функция не отрабатывает, попадая в if;
//     remove: (key) => {
//         if (!key || !reducers[key]) {
//             return;
//         }

//         delete reducers[key];
//         keysToRemove.push(key);
//         combinedReducer = combineReducers(reducers);
//     },

//     // ? ;
//     enhancer: (next) => (...args) => {
//         const store = next(...args);
//         return {
//             ...store,
//             reducerManager,
//         };
//     },
// };
// Внутри createReducerManager нужно добавить:
// return reducerManager
