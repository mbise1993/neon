import { Container } from './utils/di';
import { HistoryService } from './services/history.service';
import { ScopeService } from './services/scope.service';

export interface ContainerConfig {
  skipBaseClassChecks: boolean;
}

export class Neon {
  public static createContainer(config: ContainerConfig) {
    const container = new Container(config);
    container.bind(Container).toConstantValue(container);

    container
      .bind(HistoryService)
      .toSelf()
      .inSingletonScope();

    container
      .bind(ScopeService)
      .toSelf()
      .inSingletonScope();

    return container;
  }
}
