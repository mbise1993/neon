import { Container } from './utils/di';
import { ScopeService } from './services/scope.service';

export class NeonCoreModule {
  public static install(container: Container) {
    container
      .bind(ScopeService)
      .toSelf()
      .inSingletonScope();
  }
}
