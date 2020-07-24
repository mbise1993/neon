import { Container, Injectable, IScope } from '@neon/core';

import { appModule } from './app/app.module';
import { AuthService } from './auth/services/auth.service';
import { todoModule } from './todo/todo.module';

@Injectable()
export class LoggedInScope implements IScope {
  onAttach(container: Container) {
    const authService = container.get(AuthService);
    if (!authService.loggedInUser) {
      throw new Error('Please log in to continue');
    }

    container.load(appModule, todoModule);
  }

  onDetach(container: Container) {
    container.unload(appModule, todoModule);
  }
}
