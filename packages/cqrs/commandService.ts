import { Container, Inject, Injectable } from '@neon/core';
import { ICommand } from './command';

@Injectable()
export class CommandService {
  public constructor(@Inject(Container) private readonly container: Container) {}

  public execute(command: ICommand) {
    if (command.canExecute(this.container)) {
      command.execute(this.container);
    }
  }
}
