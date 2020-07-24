import { BehaviorSubject } from 'rxjs';
import { instance, mock, reset, when } from 'ts-mockito';
import { skip } from 'rxjs/operators';

import { AppService } from '../services/app.service';
import { AppViewModel } from './app.viewModel';
import { TodoItemFields } from '../../todo/api/todoItemFields.generated';
import { TodoItemService } from '../../todo/services/todoItem.service';
import { TodoListService } from '../../todo/services/todoList.service';

const mockAppService = mock(AppService);
const mockTodoListService = mock(TodoListService);
const mockTodoItemService = mock(TodoItemService);

describe(AppViewModel.name, () => {
  afterEach(() => {
    reset(mockTodoListService);
  });

  it('updates new item text', done => {
    when(mockTodoListService.items).thenReturn(new BehaviorSubject<TodoItemFields[]>([]));

    const vm = new AppViewModel(
      instance(mockAppService),
      instance(mockTodoListService),
      instance(mockTodoItemService),
    );

    vm.$newItemText.pipe(skip(1)).subscribe(value => {
      expect(value).toMatch('test');
      done();
    });

    vm.setNewItemText('test');
  });

  it('calls add item with correct args', async () => {
    when(mockAppService.activeUser).thenReturn({ id: '1', firstname: 'test' });
    when(mockTodoListService.items).thenReturn(new BehaviorSubject<TodoItemFields[]>([]));
    when(mockTodoListService.addItem).thenReturn({ execute: jest.fn() } as any);

    const todoListService = instance(mockTodoListService);

    const vm = new AppViewModel(
      instance(mockAppService),
      todoListService,
      instance(mockTodoItemService),
    );

    vm.setNewItemText('test');
    await vm.addItem();

    expect(todoListService.addItem.execute).toHaveBeenCalledWith({
      input: {
        user_id: '1',
        task: 'test',
        done: false,
      },
    });
  });
});
