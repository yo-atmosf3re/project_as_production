export type {
    StateSchema,
    ReduxStoreWithManagerI,
    ThunkConfigI,
} from '../../providers/StoreProvider/config/StateSchema';
export { createReduxStore, type AppDispatch } from './config/store';
export { StoreProvider } from './ui/StoreProvider';
