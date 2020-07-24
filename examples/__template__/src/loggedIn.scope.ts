import { Container, Injectable, IScope } from '@neon/core';

@Injectable()
export class LoggedInScope implements IScope {
  onAttach(container: Container) {
    // TODO: Attach modules
  }

  onDetach(container: Container) {
    // TODO: Detach modules
  }
}
