import { Neon } from '@neon/core';

import { AppScope } from './scopes';
import { authModule } from './auth/auth.module';
import { commonModule } from './common/common.module';
import { LoggedInScope } from './loggedIn.scope';

export const configureContainer = () => {
  const container = Neon.createContainer({
    skipBaseClassChecks: true,
  });

  container
    .bind(AppScope.LOGGED_IN)
    .to(LoggedInScope)
    .inSingletonScope();

  container.load(authModule, commonModule);

  return container;
};
