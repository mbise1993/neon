import { ContainerModule } from '@neon/core';

import { StorageService } from './services/storage.service';

export const commonModule = new ContainerModule(bind => {
  bind(StorageService)
    .toSelf()
    .inSingletonScope();
});
