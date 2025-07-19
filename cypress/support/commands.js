// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Primeiro Nome');
    cy.get('#lastName').type('Sobrenome');
    cy.get('#email').type('teste@cypress.com');
    cy.get('#open-text-area').type('Teste.')
});

Cypress.Commands.add('fillMandatoryFieldsAndSubmitParam', data => {
    cy.get('#firstName').type(data.primeiroNome);
    cy.get('#lastName').type(data.sobrenome);
    cy.get('#email').type(data.email);
    cy.get('#open-text-area').type(data.text);
});

Cypress.Commands.add('fillMandatoryFieldsAndSubmitParamDefault', (data = {
    primeiroNome: 'Teste Default',
    sobrenome: 'Sobrenome Default',
    email: 'teste@default.com',
    text: 'Default.'
}) => {
    cy.get('#firstName').type(data.primeiroNome);
    cy.get('#lastName').type(data.sobrenome);
    cy.get('#email').type(data.email);
    cy.get('#open-text-area').type(data.text);
})