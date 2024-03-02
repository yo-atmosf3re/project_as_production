import { selectByTestId } from 'cypress/helpers/selectByTestId';

describe('Routing', () => {
    describe('The user is not authorized', () => {
        it('Go to the main page', () => {
            cy.visit('/');
            cy
                // ? Получение страницы по data-testid;
                .get('[data-testid=MainPage]')
                // ? Передача в функцию should строки, которая указывает на то, что конкретно нужно проверить. В данном случае, можно логично предположить, что exist - проверка на существование того, что проверяется;
                .should('exist');
        });

        it('Go to the profile page', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('MainPage')).should('exist');
        });

        it("Go to the route, which doesn't exist", () => {
            cy.visit('/something');
            cy.get(selectByTestId('NotFoundPage')).should('exist');
        });
    });

    describe('The user is authorized', () => {
        // ? Выполнение коллбэка перед каждым тест кейсом (исключает дублирование кода в некоторых местах);
        beforeEach(() => {
            cy.login();
        });

        it('Go to the profile page', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('ProfilePage')).should('exist');
        });

        it('Go to the articles list page', () => {
            cy.visit('/articles');
            cy.get(selectByTestId('ArticlesPage')).should('exist');
        });
    });
});
