/* eslint-disable @typescript-eslint/no-namespace */
import { selectByTestId } from '../../helpers/selectByTestId';
import { UserI } from '../../../src/entities/User/models/types/user';
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
    return cy.request({
        method: 'POST',
        url: 'http://localhost:7777/login',
        body: {
            username,
            password,
        },
    })
        .then(({ body }) => {
            window.localStorage.setItem(USER_LS_KEY, JSON.stringify(body));
            // ? Указание возвращаемого значения в виде body позволяет получить данные о том, что вернул запрос;
            return body;
        });
};

/**
 * Делегирование получения datatest-id;
 * @param testId
 */
export const getByTestId = (testId: string) => {
    return cy
        .get(selectByTestId(testId));
};

declare global {
  namespace Cypress {
    interface Chainable {
        // ? Указание возвращаемого значения метода - это UserI (информация о пользователе, которую возвращает сервер);
      login(email?: string, password?: string): Chainable<UserI>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
