import { ContainerModule } from 'inversify';

import { AppService } from './services/app.service';
import { AppViewModel } from './viewModels/app.viewModel';

export const appModule = new ContainerModule(bind => {
  bind(AppService)
    .toSelf()
    .inSingletonScope();

  bind(AppViewModel)
    .toSelf()
    .inTransientScope();
});
