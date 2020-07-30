import { Container } from '@neon/core';

import { CommandDispatcher } from './commandDispatcher';
import { CommandService } from './commandService';

export class NeonCQRS {
  public static attach(container: Container) {
    container
      .bind(CommandService)
      .toSelf()
      .inSingletonScope();

    container
      .bind(CommandDispatcher)
      .toSelf()
      .inSingletonScope();
  }
}
