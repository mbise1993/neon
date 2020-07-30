import { ICommand, IServiceProvider } from '@neon/cqrs';

import { AuthService } from '../services/auth.service';

export class SignInCommand implements ICommand {
  public canExecute() {
    return true;
  }

  public execute(serviceProvider: IServiceProvider) {
    const authService = serviceProvider.get(AuthService);
    authService.signIn('1');
  }
}
