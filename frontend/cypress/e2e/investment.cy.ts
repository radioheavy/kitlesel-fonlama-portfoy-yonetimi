/// <reference types="cypress" />

describe('Investment Management', () => {
     beforeEach(() => {
       // Kullanıcı girişi yapma (Bu kısım için bir custom command oluşturabilirsiniz)
       cy.login('test@example.com', 'password123');
     });
   
     it('should add a new investment', () => {
       cy.visit('/investments/new');
       cy.get('select[name="companyName"]').select('Test Company');
       cy.get('input[name="amount"]').type('1000');
       cy.get('input[name="shares"]').type('100');
       cy.get('input[name="investmentDate"]').type('2023-01-01');
       cy.get('button[type="submit"]').click();
       cy.contains('Yeni yatırım başarıyla eklendi').should('be.visible');
       cy.url().should('include', '/portfolio');
     });
   
     it('should display investments in portfolio', () => {
       cy.visit('/portfolio');
       cy.contains('Portföyüm').should('be.visible');
       cy.get('table').should('exist');
       cy.contains('Test Company').should('be.visible');
     });
   });