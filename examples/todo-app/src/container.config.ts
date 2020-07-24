import { Container, NeonCoreModule } from '@neon/core';

import { AppScope } from './scopes';
import { authModule } from './auth/auth.module';
import { commonModule } from './common/common.module';
import { LoggedInScope } from './loggedIn.scope';

export const configureContainer = () => {
  const container = new Container({
    skipBaseClassChecks: true,
  });

  container.bind(Container).toConstantValue(container);

  container
    .bind(AppScope.LOGGED_IN)
    .to(LoggedInScope)
    .inSingletonScope();

  container.load(authModule, commonModule);

  NeonCoreModule.install(container);

  return container;
};
