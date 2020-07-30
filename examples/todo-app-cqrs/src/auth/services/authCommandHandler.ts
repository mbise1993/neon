import { ICommand, ICommandHandler } from '@neon/cqrs';
import { Injectable } from '@neon/core';

@Injectable()
export class AuthCommandHandler implements ICommandHandler {
  public canExecute(command: ICommand) {
    return true;
  }

  public execute(command: ICommand) {}
}
