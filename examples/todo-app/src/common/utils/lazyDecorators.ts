import getDecorators from 'inversify-inject-decorators';

import { Container } from '@neon/core';

type Decorators = ReturnType<typeof getDecorators>;

interface LazyDecorators {
  Inject: Decorators['lazyInject'];
}

export const Lazy: LazyDecorators = {
  Inject: () => () => {},
};

export function initializeDecorators(container: Container) {
  const decorators = getDecorators(container);

  Lazy.Inject = decorators.lazyInject;
}
