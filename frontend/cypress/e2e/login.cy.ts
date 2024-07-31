/// <reference types="cypress" />
describe('Login', () => {
     it('should login successfully with correct credentials', () => {
       cy.visit('/login');
       cy.get('input[name="email"]').type('test@example.com');
       cy.get('input[name="password"]').type('password123');
       cy.get('button[type="submit"]').click();
       cy.url().should('include', '/dashboard');
       cy.contains('Dashboard').should('be.visible');
     });
   
     it('should show error message with incorrect credentials', () => {
       cy.visit('/login');
       cy.get('input[name="email"]').type('wrong@example.com');
       cy.get('input[name="password"]').type('wrongpassword');
       cy.contains('Giriş yapılırken bir hata oluştu').should('be.visible');
       cy.contains('Giriş yapılırken bir hata oluştu').should('be.visible');
           });
   });