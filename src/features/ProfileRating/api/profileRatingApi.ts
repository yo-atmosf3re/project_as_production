import { rtkApi } from '@/shared/api/rtkApi';
import { RatingProfileI } from '../model/types/types';

/**
 * Интерфейс, описывающий получение данных с сервера;
 */
interface GetProfileRatingArgI {
    userId: string;
    profileId: string;
}

/**
 * Интерфейс, описывающий мутацию данных, которые будут отправлены на сервер;
 */
interface RateProfileArgI {
    userId: string;
    profileId: string;
    rate: number;
    feedback?: string;
}

/**
 * Редьюсер для работы с рейтингом в профиле пользователей;
 */
const profileRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // ? Свойство query у объекта build запрашивает данные с сервера (GET);
        getProfileRating: build.query<RatingProfileI[], GetProfileRatingArgI>({
            query: ({ profileId, userId }) => ({
                url: '/profile-ratings',
                params: {
                    profileId,
                    userId,
                },
            }),
        }),
        // ? Свойство mutation у объекта build изменяет данные, а затем отправляет их на сервер или отправляет измененные данные на сервер (если простым языком, то это PUT, POST, DELETE методы);
        rateProfile: build.mutation<void, RateProfileArgI>({
            query: (rateArguments) => ({
                url: '/profile-ratings',
                // ? Т.к данные будут сохраняться, указываем метод POST;
                method: 'POST',
                body: rateArguments,
            }),
        }),
    }),
});

export const useGetProfileRating = profileRatingApi.useGetProfileRatingQuery;
export const useRateProfile = profileRatingApi.useRateProfileMutation;
