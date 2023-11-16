// ? Инкапсулируем сюда логику для аксиоса, создаём инстанс аксиоса;

import axios from 'axios';
import { USER_LS_KEY } from 'shared/const/localstorage';

export const $API = axios.create({
    baseURL: __API__,
});

// ? Объявляем интерцептор, который отрабатывает перед каким-то действием, в данном случае - перед запросом авторизации
$API.interceptors.request.use((config) => {
    // ! Задаём headers внутри интерцептора;
    // ? В headers задаём заголовки HTTP-запроса. Устанавливаем значение для Authorization. В Authorization хранится информация о доступе или аутентификации пользователя на сервер. В нашем случае значение Authorization содержит т.н "токен" аутентификации пользователя, полученный при предыдущей авторизации;
    if (config.headers) {
        // ? На т.н сервере проверяется наличие самого заголовка, но не его содержимое, имитация авторизации. Если авторизованы, то сервер пропустит запрос, а если нет - вернётся undefined, сервер не пропустит запрос;
        config.headers.Authorization = localStorage.getItem(USER_LS_KEY) || '';
    }
    return config;
});
