import { ProfileI, VALIDATE_PROFILE_ERROR } from '../../types/profile';

// ? Функция для валидации, которая принимает в качестве аргумента профиль. Простой функционал сбора ошибок в массив errors, который эта функция возвращает. Данная функция вызывается в updateProfileData(). При отсутствии переданного profile возвращает NO_DATA ошибку;
export const validateProfileData = (profile?: ProfileI): VALIDATE_PROFILE_ERROR[] => {
    if (!profile) {
        return [VALIDATE_PROFILE_ERROR.NO_DATA];
    }

    const {
        first, lastname, age, country,
    } = profile;

    const errors: VALIDATE_PROFILE_ERROR[] = [];

    if (!first || !lastname) {
        errors.push(VALIDATE_PROFILE_ERROR.INCORRECT_USER_DATA);
    }
    if (!age || !Number.isInteger(age)) {
        errors.push(VALIDATE_PROFILE_ERROR.INCORRECT_AGE);
    }
    if (!country) {
        errors.push(VALIDATE_PROFILE_ERROR.INCORRECT_COUNTRY);
    }

    // ? В дальнейшем, чтобы получить эти возвращаемые данные, обращаемся с помощью селектора к этим данным;
    return errors;
};
// " Если какая-то из валидацинных проверок будет слишком сложной, большой и будет использовать множество различных полей, то её можно будет вынести в отдельную функциюю, которая будет вызываться в validateProfileData();
