import { StateSchema } from '@/app/providers/StoreProvider';
import { VALIDATE_PROFILE_ERROR } from '@/shared/const/consts';
import { getProfileValidateErrors } from './getProfileValidateErrors';

describe('getProfileValidateErrors', () => {
    test('Should return part of profiles state with property "validateErrors"', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors: [VALIDATE_PROFILE_ERROR.INCORRECT_AGE],
            },
        };

        expect(getProfileValidateErrors(state as StateSchema)).toEqual([
            VALIDATE_PROFILE_ERROR.INCORRECT_AGE,
        ]);
    });

    test('Should return undefined with empty readonly property', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileValidateErrors(state as StateSchema)).toEqual(
            undefined,
        );
    });
});
