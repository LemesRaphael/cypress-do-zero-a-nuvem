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
    cy.get('#firstName').type('Primeiro Nome');
    cy.get('#lastName').type('Sobrenome');
    cy.get('#email-checkbox').check();
    cy.get('#email').type('Teste');
    cy.get('#open-text-area').type('Teste');
    cy.get('button[type=submit]').click();
    cy.get('.error').should('be.visible');
  });

  it('verifica se os valores digitados no campo telefone são numericos', () => {
    cy.get('#phone').type('abcd');
    cy.get('#phone').should('be.empty');
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Primeiro Nome');
    cy.get('#lastName').type('Sobrenome');
    cy.get('#email').type('Teste@teste.com');
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

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('button[type=submit]').click();
    cy.get('.success').should('be.visible')
  });

  it('envia o formuário com sucesso usando um comando customizado com parametro', () => {
    const data = {
      primeiroNome: 'Teste',
      sobrenome: 'Sobrenome Teste',
      email: 'teste@teste.com',
      text: 'Teste.'
    }
    cy.fillMandatoryFieldsAndSubmitParam(data);
    cy.get('button[type=submit]').click();
    cy.get('.success').should('be.visible');
  });

  it('envia o formuário com sucesso usando um comando customizado com parametro Default', () => {
    cy.fillMandatoryFieldsAndSubmitParamDefault();
    cy.get('button[type=submit]').click();
    cy.get('.success').should('be.visible');
  });

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube');
    cy.get('#product').should('have.value', 'youtube')
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria');
    cy.get('#product').should('have.value', 'mentoria');
  });

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1);
    cy.get('#product').should('have.value', 'blog');
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"]').check('feedback');
    cy.get('input[type="radio"]').should('be.checked');
    // Outra forma de "setar" valores no check
    // cy.get('input[type="radio"][value="feedback"]').check().should('be.checked');
  });

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').check('ajuda').should('be.checked');
    cy.get('input[type="radio"]').check('elogio').should('be.checked');
    cy.get('input[type="radio"]').check('feedback').should('be.checked');

    // Outra forma de selecionar varios radios
    // cy.get('input[type="radio"]').each(typeOfService => {
    //   cy.wrap(typeOfService).check().should('be.checked')
    // });
  });

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"][value="email"]').check().should('be.checked');
    cy.get('input[type="checkbox"][value="phone"]').check().should('be.checked');
    cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked');

    // Outra forma de fazer
    // cy.get('input[type="checkbox"]')
    // .check()
    // .should('be.checked')
    // .last()
    // .uncheck()
    // .should('not.be.checked');
  });

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json').should(input => {
      expect(input[0].files[0].name).to.eq('example.json')
    });
  });

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }).should(input => {
      expect(input[0].files[0].name).to.eq('example.json');
    });
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('arquivoSelecionado')
    cy.get('input[type="file"]').selectFile('@arquivoSelecionado').should(input => {
      expect(input[0].files[0].name).to.eq('example.json');
    });
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade').should('have.attr', 'href', 'privacy.html').and('have.attr', 'target', '_blank');
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click();
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible');
  });
});