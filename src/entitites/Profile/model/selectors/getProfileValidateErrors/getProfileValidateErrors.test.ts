import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileValidateErrors } from './getProfileValidateErrors';
import { VALIDATE_PROFILE_ERROR } from '../../types/profile';

describe('getProfileValidateErrors', () => {
    test('Should return part of profiles state with property "validateErrors"', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateError: [
                    VALIDATE_PROFILE_ERROR.INCORRECT_AGE,
                ],
            },
        };

        expect(getProfileValidateErrors(state as StateSchema)).toEqual([VALIDATE_PROFILE_ERROR.INCORRECT_AGE]);
    });

    test('Should return undefined with empty readonly property', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
    });
});
