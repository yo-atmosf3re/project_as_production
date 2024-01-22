import { StateSchema } from '@/app/providers/StoreProvider';

// ? Для того, чтобы в инпут не попадал undefined, инициализируем значение пустой строкой при отсутствии данных из state;
export const getCommentFormText = (state: StateSchema) => state.addCommentForm?.text ?? '';
