import { Neon } from '@neon/core';

import { AppScope } from './scopes';
import { LoggedInScope } from './loggedIn.scope';

export const configureContainer = () => {
  const container = Neon.createContainer({
    skipBaseClassChecks: true,
  });

  container
    .bind(AppScope.LOGGED_IN)
    .to(LoggedInScope)
    .inSingletonScope();

  return container;
};
