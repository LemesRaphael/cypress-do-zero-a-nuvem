describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  it('verifica o título da aplicação', () => {
    cy.title().should('be.eq', 'Central de Atendimento ao Cliente TAT');
  });

  it('preenche os campos obrigatórios e envia o formulário', () => {
    // Criando Valores
    cy.get('#firstName').as('PrimeiroNome').type('Primeiro Nome');
    cy.get('#lastName').as('Sobrenome').type('Sobrenome');
    cy.get('#email').as('email').type('teste@cypress.com');
    cy.get('#email-checkbox').as('EmailCheckbox').check();
    cy.get('#open-text-area').as('TextArea').type('Testestestestetestestestestestestestestestestestesteste', { delay: 0 });
    cy.get('button[type=submit]').as('BotaoEnviar');
    // Validando valores
    cy.get('@PrimeiroNome').should('have.value', 'Primeiro Nome');
    cy.get('@Sobrenome').should('have.value', 'Sobrenome');
    cy.get('@email').should('have.value', 'teste@cypress.com');
    cy.get('@EmailCheckbox').should('be.checked');
    cy.get('@TextArea').should('have.value', 'Testestestestetestestestestestestestestestestestesteste');
    cy.get('@BotaoEnviar').click();
    cy.get('.success').should('be.visible');
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#email').type('Teste');
    cy.get('button[type=submit]').click();
    cy.get('.error').should('be.visible');
  });

  it('verifica se os valores digitados no campo telefone são numericos', () => {
    cy.get('#phone').type('abcd');
    cy.get('#phone').should('be.empty');
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#phone-checkbox').check();
    cy.get('button[type=submit]').click();
    cy.get('.error').should('be.visible');
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Primeiro Nome').should('have.value', 'Primeiro Nome');
    cy.get('#lastName').type('Sobrenome').should('have.value', 'Sobrenome');
    cy.get('#email').type('teste@cypress.com').should('have.value', 'teste@cypress.com');
    cy.get('#phone').type('12345678').should('have.value', '12345678');

    cy.get('#firstName').clear().should('have.value', '');
    cy.get('#lastName').clear().should('have.value', '');
    cy.get('#email').clear().should('have.value', '');
    cy.get('#phone').clear().should('have.value', '');
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type=submit]').click();
    cy.get('.error').should('be.visible');
  });
})