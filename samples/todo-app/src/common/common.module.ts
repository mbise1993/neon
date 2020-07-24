import { ContainerModule } from 'inversify';

import { StorageService } from './services/storage.service';

export const commonModule = new ContainerModule(bind => {
  bind(StorageService).toSelf().inSingletonScope();
});
