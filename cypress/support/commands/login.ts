import { USER_LS_KEY } from '../../../src/shared/const/localstorage';

/**
 * Декомпозиция команды, которая отвечает за воспроизведение авторизации;
 * @param username
 * @param password
 */
export const login = (
    username = 'testuser',
    password = '4',
) => {
    // ? Описание запроса с опеределенным поведением: указываем метод, адрес бекенда с эндпоинтом, тело запроса (воспроизведение поведения бекенда в приложении), а затем сохраняем в LS пользователя с уникальным ключом и авторизационными данными;
    cy.request({
        method: 'POST',
        url: 'http://localhost:7777/login',
        body: {
            username,
            password,
        },
    })
        .then(({ body }) => {
            window.localStorage.setItem(USER_LS_KEY, JSON.stringify(body));
        });
};
