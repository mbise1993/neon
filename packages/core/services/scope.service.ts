import { Container, Inject, Injectable } from '../utils/di';

export interface IScope {
  onAttach(container: Container): void;
  onDetach(container: Container): void;
}

@Injectable()
export class ScopeService {
  private readonly attachedScopes = new Map<string, IScope>();

  public constructor(@Inject(Container) private readonly container: Container) {}

  public attach(scopeId: string) {
    const scope = this.container.get<IScope>(scopeId);
    scope.onAttach(this.container);
    this.attachedScopes.set(scopeId, scope);
  }

  public detach(scopeId: string) {
    const scope = this.attachedScopes.get(scopeId);
    if (!scope) {
      throw new Error(`Scope with ID "${scopeId}" is not attached`);
    }

    scope.onDetach(this.container);
    this.attachedScopes.delete(scopeId);
  }
}
