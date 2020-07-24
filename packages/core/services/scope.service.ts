import { Container, Injectable } from '../utils/di';
import { inject } from 'inversify';

export interface IScope {
  onAttach(container: Container): void;
  onDetach(container: Container): void;
}

@Injectable()
export class ScopeService {
  private readonly attachedScopes = new Map<string, IScope>();

  constructor(@inject(Container) private readonly container: Container) {}

  attach(scopeId: string) {
    const scope = this.container.get<IScope>(scopeId);
    scope.onAttach(this.container);
    this.attachedScopes.set(scopeId, scope);
  }

  detach(scopeId: string) {
    const scope = this.attachedScopes.get(scopeId);
    if (!scope) {
      throw new Error(`Scope with ID "${scopeId}" is not attached`);
    }

    scope.onDetach(this.container);
    this.attachedScopes.delete(scopeId);
  }
}
