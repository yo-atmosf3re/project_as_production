/* eslint-disable @typescript-eslint/no-namespace */

import { login } from './commands/login';

// ? Функции и команды, описывающие, что можно сделать в приложении;
Cypress.Commands.add('login', login);

declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<void>;
    }
  }
}
