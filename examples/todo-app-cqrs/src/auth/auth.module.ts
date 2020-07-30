import { ContainerModule } from '@neon/core';

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
