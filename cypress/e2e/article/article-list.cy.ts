describe('The user go to article list page', () => {
    beforeEach(() => {
        cy
            .login()
            .then(
                (data) => {
                    cy.visit('articles');
                },
            );
    });
    it('The article list page is successfuly loaded', () => {
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
    });
});
