/* eslint-disable @typescript-eslint/no-namespace */
import { USER_LS_KEY } from '../../../src/shared/const/localstorage';

export const updateProfile = () => {
    cy.getByTestId(
        'EditableProfilePageHeader.EditButton',
    );
};

export const resetProfile = () => {
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

declare global {
  namespace Cypress {
    interface Chainable {
      updatePfoile(): Chainable<void>;
      resetPfoile(): Chainable<void>;
    }
  }
}
