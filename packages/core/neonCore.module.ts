import { Container, ContainerModule } from './utils/di';
import { ScopeService } from './services/scope.service';

export class NeonCoreModule {
  public static install(container: Container) {
    container.load(
      new ContainerModule(bind => {
        bind(ScopeService).toSelf();
      }),
    );
  }
}
