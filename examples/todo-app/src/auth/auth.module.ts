import { ContainerModule } from 'inversify';

import { AuthService } from './services/auth.service';
import { SignInViewModel } from './viewModels/signIn.viewModel';

export const authModule = new ContainerModule(bind => {
  bind(AuthService)
    .toSelf()
    .inSingletonScope();

  bind(SignInViewModel)
    .toSelf()
    .inSingletonScope();
});
