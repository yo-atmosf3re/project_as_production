import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserInited } from './getUserInited';

describe('getUserInited', () => {
    test('Should return part of users state with _inited', () => {
        const state: DeepPartial<StateSchema> = { user: { _inited: false } };

        expect(getUserInited(state as StateSchema)).toEqual(false);
    });
});
