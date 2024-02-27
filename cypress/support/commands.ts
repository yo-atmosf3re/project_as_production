/* eslint-disable @typescript-eslint/no-namespace */
import * as commonCommands from './commands/common';
import * as profileCommands from './commands/profile';
import * as articleCommands from './commands/article';

// ? Функции и команды, описывающие, что можно сделать в приложении;
// ? UPD: обновление на метод addAll, внутрь которого передано всё то, что импортируется из файла common.ts;
Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);
