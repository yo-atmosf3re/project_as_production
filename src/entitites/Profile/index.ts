export { getProfileData } from './model/selectors/getProfileData/getProfileData';
export { getProfileIsLoading } from './model/selectors/getProfileIsLoading/getProfileIsLoading';
export { getProfileError } from './model/selectors/getProfileError/getProfileError';

export {
    fetchProfileData,
} from './model/services/fetchProfileData/fetchProfileData';

export {
    ProfileI, ProfileSchema,
} from './model/types/profile';

export {
    profileReducer, profileSlice,
} from './model/slice/profileSlice';

export { ProfileCard } from './ui/ProfileCard/ProfileCard';
