import { ContainerModule } from '@neon/core';

import { TodoListService } from './services/todoList.service';
import { TodoListViewModel } from './viewModels/todoList.viewModel';

export const todoModule = new ContainerModule(bind => {
  bind(TodoListService)
    .toSelf()
    .inSingletonScope();

  bind(TodoListViewModel)
    .toSelf()
    .inTransientScope();
});
