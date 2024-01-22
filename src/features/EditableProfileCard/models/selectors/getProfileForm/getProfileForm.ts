import { StateSchema } from '@/app/providers/StoreProvider';

// ? Данные профиля, которые пользователь сам вводил, изменяя при этом data (data - это то, что получаем с сервера);
export const getProfileForm = (state:StateSchema) => state.profile?.form;
