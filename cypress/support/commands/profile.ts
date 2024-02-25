/* eslint-disable @typescript-eslint/no-namespace */

/**
 * Команда, отрабатывающая нажатие на кнопку редактирования профиля, затем ввод в поля `lastname` и `firstname` каких-то значений, сохранение новых данных по нажатию кнопки;
 */
export const updateProfile = (firstname: string, lastname: string) => {
    cy
        // ? Получение кнопки редактирования;
        .getByTestId(
            'EditableProfilePageHeader.EditButton',
        )
        // ? Воспроизведение режима редактирования путём нажатия на кнопку;
        .click();
    cy
        // ? Получение инпута;
        .getByTestId(
            'ProfileCard.firstname',
        )
        // ? Его очистка;
        .clear()
        // ? Ввод каких-то значений;
        .type(firstname);
    cy
        // ? Получение инпута;
        .getByTestId(
            'ProfileCard.lastname',
        )
        // ? Его очистка;
        .clear()
        // ? Ввод каких-то значений;
        .type(lastname);
    cy
        // ? Получение кнопки сохранения;
        .getByTestId('EditableProfilePageHeader.SaveButton')
        // ? Сохранение данных кликом по этой кнопке;
        .click();
};

/**
 * Отработка сброса данных профиля;
 */
export const resetProfile = (profileId: string) => {
    return cy.request({
        method: 'PUT',
        url: `http://localhost:7777/profile/${profileId}`,
        headers: {
            Authorization: 'asasf',
        },
        body: {
            id: '4',
            first: 'Test',
            lastname: 'Userovich',
            age: 92,
            currency: 'EUR',
            country: 'Armenia',
            city: 'Erevan',
            username: 'testuser',
            avatar: 'https://copp15.ru/Portals/0/ModuleFiles/i.jpg',
        },
    });
};

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstname: string, lastname: string): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}
