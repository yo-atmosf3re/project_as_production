/* eslint-disable @typescript-eslint/no-namespace */
/**
 * Переиспользуемые команды, которые непосредственно связаны с комментариями и с их взаимодействием (в текущем виде, данный модуль, для которого описываются данные команды, может использоваться в любом месте проекта);
 * @param text
 */
export const addComment = (text: string) => {
    cy
        // ? Получение инпута, в который вводятся комментарии;
        .getByTestId('AddCommentForm.Input')
        // ? Ввод текста в инпут;
        .type(text);
    cy
        // ? Получение кнопки, с помощью которой отправляются комментарии;
        .getByTestId('AddCommentForm.Button')
        // ? Отправка комментария;
        .click();
};

declare global {
    namespace Cypress {
        interface Chainable {
            addComment(text: string): Chainable<void>;
        }
    }
}
