import { Container } from 'inversify';

import { authModule } from './auth/auth.module';
import { commonModule } from './common/common.module';
import { LoggedInScope } from './loggedIn.scope';
import { scopes } from './scopes';

export const configureContainer = () => {
  const container = new Container({
    skipBaseClassChecks: true,
  });

  container.bind(Container).toConstantValue(container);

  container
    .bind(scopes.LOGGED_IN)
    .to(LoggedInScope)
    .inSingletonScope();

  container.load(authModule, commonModule);

  return container;
};
