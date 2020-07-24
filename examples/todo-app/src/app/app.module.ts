import { ContainerModule } from 'inversify';

import { AppService } from './services/app.service';

export const appModule = new ContainerModule(bind => {
  bind(AppService)
    .toSelf()
    .inSingletonScope();
});
