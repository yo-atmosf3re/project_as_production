import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm', () => {
    test('Should return part of profiles state with object "form"', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                form: {
                    first: 'Alex',
                    lastname: 'Chrome',
                },
            },
        };

        expect(getProfileForm(state as StateSchema)).toEqual({
            first: 'Alex',
            lastname: 'Chrome',
        });
    });

    test('Should return undefined with empty form object', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});
