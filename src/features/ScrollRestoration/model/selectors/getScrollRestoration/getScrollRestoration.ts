import { StateSchema } from '@/app/providers/StoreProvider';

export const getScrollRestoration = (state: StateSchema) => state.scrollRestoration.scroll;
