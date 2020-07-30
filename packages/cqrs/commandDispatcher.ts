import { Container, Inject, Injectable } from '@neon/core';

import { COMMAND_HANDLER_KEY, ICommandHandler } from './commandHandler';
import { ICommand } from './command';

@Injectable()
export class CommandDispatcher {
  public constructor(@Inject(Container) private readonly container: Container) {}

  public dispatch(command: ICommand) {
    const handlers = this.container.getAll<ICommandHandler>(COMMAND_HANDLER_KEY);
    handlers.forEach(handler => {
      if (handler.canExecute(command)) {
        handler.execute(command);
      }
    });
  }
}
