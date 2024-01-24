import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { COUNTRY } from '@/entities/Country';
import { CURRENCY } from '@/shared/const/consts';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { ProfileCard } from '@/entities/Profile';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getProfileError } from '../../models/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../../models/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../models/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../models/selectors/getProfileReadonly/getProfileReadonly';
import { fetchProfileData } from '../../models/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../models/slice/profileSlice';
import { EditableProfilePageHeader } from '../EditableProfilePageHeader/EditableProfilePageHeader';

interface EditableProfileCardPropsI {
    className?: string;
    id?: string;
}

const INITIAL_REDUCERS: ReducersList = {
    profile: profileReducer,
};

/**
 * Компонента, внутри которой декомпозирована логика по редактированию и отрисовке карточки пользователя;
 */
export const EditableProfileCard: React.FC<EditableProfileCardPropsI> = memo(({
    className, id,
}) => {
    const dispatch = useAppDispatch();
    // ? Получаем дублированные данные из стейта, изменяем и работаем уже дальше с ними, а если нужно вернуть вводимые значения к дефолтным - это легко происходит в экшене cancelEdit, который активируется в ProfilePageHeader в обработчике событий;
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    });

    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            first: value || '',
        }));
    }, [dispatch]);

    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            lastname: value || '',
        }));
    }, [dispatch]);

    const onChangeAge = useCallback((value?: string) => {
        // ? Regex отрабатывает только на цифрах;
        const regex = /^\d*$/;
        // ? Если условие не выполняется, то и в инпут в итоге ничего не попадает;
        if (regex.test(value || '')) {
            dispatch(profileActions.updateProfile({
                age: Number(value || 0),
            }));
        }
    }, [dispatch]);

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            city: value || '',
        }));
    }, [dispatch]);

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            username: value || '',
        }));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            avatar: value || '',
        }));
    }, [dispatch]);

    const onChangeCurrency = useCallback((currency: CURRENCY) => {
        dispatch(profileActions.updateProfile({ currency }));
    }, [dispatch]);

    const onChangeCountry = useCallback((country: COUNTRY) => {
        dispatch(profileActions.updateProfile({ country }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader
            reducers={INITIAL_REDUCERS}
        >
            <EditableProfilePageHeader />
            <ProfileCard
                data={formData}
                isLoading={isLoading}
                error={error}
                readonly={readonly}
                onChangeFirstnameHandler={onChangeFirstname}
                onChangeLastnameHandler={onChangeLastname}
                onChangeAgeHandler={onChangeAge}
                onChangeCityHandler={onChangeCity}
                onChangeUsernameHandler={onChangeUsername}
                onChangeAvatarHandler={onChangeAvatar}
                onChangeCurrencyHandler={onChangeCurrency}
                onChangeCountryHandler={onChangeCountry}
                className={className}
            />
        </DynamicModuleLoader>
    );
});
