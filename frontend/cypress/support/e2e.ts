import './commands'

// Cypress'in global namespace'ini genişletmek için daha önce eklediğimiz tanımlamayı buraya da ekleyin
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
    }
  }
}