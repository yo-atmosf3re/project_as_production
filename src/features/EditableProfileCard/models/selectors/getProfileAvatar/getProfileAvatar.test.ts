import { StateSchema } from '@/app/providers/StoreProvider';
import { Avatar } from '@/shared/assets/tests/avatar_image_for_test.jpg';
import { getProfileAvatar } from './getProfileAvatar';

describe('getProfileAvatar', () => {
    test('Should return part of profiles state with object "data" and property "avatar"', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: {
                    avatar: Avatar,
                },
            },
        };

        expect(getProfileAvatar(state as StateSchema)).toEqual(
            Avatar,
        );
    });

    test('Should return empty string with empty data object', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileAvatar(state as StateSchema)).toEqual('');
    });
});
