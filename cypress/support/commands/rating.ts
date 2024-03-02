/* eslint-disable @typescript-eslint/no-namespace */

/**
 * Переиспользуемые команды, которые непосредственно связаны с рейтингом и с их взаимодействием (в текущем виде, данный модуль, для которого описываются данные команды, может использоваться в любом месте проекта);
 * @param starsCount
 * @param feedback
 */
export const setRate = (starsCount = 5, feedback = 'feedback') => {
    cy
        // ? Получение определенной звезды;
        .getByTestId(`StarRating.${starsCount}`)
        // ? Клик по звезде;
        .click();
    cy
        // ? Получение инпута, в который нужно ввести фидбек;
        .getByTestId('RatingCard.Input')
        // ? Ввод фидбека;
        .type(feedback);
    cy
        // ? Получение кнопки отправки рейтинга;
        .getByTestId('RatingCard.Send')
        // ? Отправка рейтинга;
        .click();
};

declare global {
    namespace Cypress {
        interface Chainable {
            setRate(starsCount: number, feedback: string): Chainable<void>;
        }
    }
}
