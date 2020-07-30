import { ICommand } from './command';

export const COMMAND_HANDLER_KEY = Symbol.for('COMMAND_HANDLER_KEY');

export interface ICommandHandler {
  canExecute(command: ICommand): boolean;
  execute(command: ICommand): void;
}
