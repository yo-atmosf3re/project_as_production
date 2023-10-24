import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileFirstname } from './getProfileFirstname';

describe('getProfileFirstname', () => {
    test('Should return part of profiles state with object "data" and property "first"', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: {
                    first: 'Alex',
                },
            },
        };

        expect(getProfileFirstname(state as StateSchema)).toEqual('Alex');
    });

    test('Should return empty string with empty data object', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileFirstname(state as StateSchema)).toEqual('');
    });
});
