describe('xcom page', () => {

    it('Should load main page', () => {
        cy.visit('https://www.x-kom.pl')
        cy.get('.sc-an0bcv-3').should('exist').and('have.text', 'Dostosowujemy się do Ciebie')
        cy.contains('W porządku').should('exist');
        cy.contains('W porządku').click();
        cy.get('.sc-an0bcv-3').should('not.exist')
    })

    it('Should move to login page', () => {
        cy.visit('https://www.x-kom.pl')
        cy.contains('W porządku').click();

        cy.contains('Twoje konto').should('exist')
        cy.contains('Twoje konto').click()

        cy.url().should('contain', 'logowanie');
        cy.get('.sc-dscwo7-1').should('exist').and('have.text', 'Zaloguj się')
    })

    it('Should inform when incorrect credentials', () => {
        cy.visit('https://www.x-kom.pl/logowanie')

        cy.get('form input[name="login"]')
            .should('be.visible')
            .and('have.value', '')
            .type('test')
            .should('have.value', 'test')

        cy.get('form input[name="password"]')
            .should('be.visible')
            .and('have.value', '')
            .type('test')
            .should('have.value', 'test')

        cy.get('button')
            .contains('Zaloguj się')
            .click()

        cy.get('form span')
            .should('exist')
            .and('contain.text', 'Sprawdź, czy adres e-mail i hasło są poprawne')
    })
})