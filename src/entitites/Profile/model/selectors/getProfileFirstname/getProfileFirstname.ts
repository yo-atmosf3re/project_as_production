import { StateSchema } from 'app/providers/StoreProvider';

// ! В этот момент разработки был включен строгий режим TS, потому что без строго режима TS позволял здесь обращаться к свойствам объекта без опциональной цепочки, но при обращении к data.first может быть так, что data является undefined;
export const getProfileFirstname = (state: StateSchema) => state.profile?.data?.first || '';
