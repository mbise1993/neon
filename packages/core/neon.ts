import { Container } from './utils/di';
import { ScopeService } from './services/scope.service';

export interface ContainerConfig {
  skipBaseClassChecks: boolean;
}

export class Neon {
  public static createContainer(config: ContainerConfig) {
    const container = new Container(config);
    container.bind(Container).toConstantValue(container);

    container
      .bind(ScopeService)
      .toSelf()
      .inSingletonScope();

    return container;
  }
}
