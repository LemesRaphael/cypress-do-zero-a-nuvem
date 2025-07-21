it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('src/privacy.html');
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible');
    cy.contains('p', 'aplicação').should('be.visible');
    cy.contains('p', 'tecnologias').should('be.visible');
    cy.contains('p', 'persistência').should('be.visible');
    cy.contains('p', 'Talking').should('be.visible');
  });