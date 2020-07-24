import { ContainerModule } from 'inversify';

import { TodoItemService } from './services/todoItem.service';
import { TodoItemViewModel } from './viewModels/todoItem.viewModel';
import { TodoListService } from './services/todoList.service';
import { TodoListViewModel } from './viewModels/todoList.viewModel';

export const todoModule = new ContainerModule(bind => {
  bind(TodoItemService)
    .toSelf()
    .inSingletonScope();

  bind(TodoListService)
    .toSelf()
    .inSingletonScope();

  bind(TodoItemViewModel)
    .toSelf()
    .inTransientScope();

  bind(TodoListViewModel)
    .toSelf()
    .inTransientScope();
});
