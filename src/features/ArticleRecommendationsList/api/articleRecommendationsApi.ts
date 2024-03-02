import { ArticleI } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

// ? Удобство RTK Query в данном случае заключается в том, что используется описание эндпоинтов, внутри которых выполняется либо запрос (query), либо изменение/создание/удаление данных (mutation, внутри query можно указать методы запросов PUT, POST, DELETE и т.д). Описание эндпоинтов, с которыми будет взаимодействие в дальнейшем, создаёт автоматически хуки (автоматическая типизация: при обращении к свойствам объекта с API, TS создаёт названия этим хукам, пример описан и объявлен ниже);
// ? Стоит так же отметить, что injectEndpoint внедряется асинхронно (в случае, если это используется в lazy-компоненте, то такой редьюсер не попадает в основной бандл);
// ? Использование RTK Query отлично вписывается в модульную концепцию;
/**
 * Редьюсер для получение лимитированного количества рекомендованных статей;
 */
const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendaionsList: build.query<ArticleI[], number>({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
});

export const useArticleRecommendationsList =
    recommendationsApi.useGetArticleRecommendaionsListQuery;
