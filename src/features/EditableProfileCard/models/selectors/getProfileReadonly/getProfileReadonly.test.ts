import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileReadonly } from './getProfileReadonly';

describe('getProfileReadonly', () => {
    test('Should return part of profiles state with property "readonly"', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                readonly: true,
            },
        };

        expect(getProfileReadonly(state as StateSchema)).toEqual(true);
    });

    test('Should return undefined with empty readonly property', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileReadonly(state as StateSchema)).toEqual(undefined);
    });
});
