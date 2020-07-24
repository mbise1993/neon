import { BehaviorSubject } from 'rxjs';
import { inject } from 'inversify';

import { Injectable } from '@neon/core';
import { ViewModel } from '@neon/react';

import { Model, TodoItemFields } from '../models/todoItem.model';
import { TodoListService } from '../services/todoList.service';

interface Props {
  todoItem: Model<TodoItemFields>;
}

@Injectable()
export class TodoItemViewModel extends ViewModel<Props> {
  constructor(@inject(TodoListService) private readonly todoListService: TodoListService) {
    super();
  }

  public $editText = new BehaviorSubject('');
  public $isEditing = new BehaviorSubject(false);

  public getTodoItem() {
    return this.$props.value.todoItem;
  }

  public startEditing() {
    this.$editText.next(this.getTodoItem().get('text'));
    this.$isEditing.next(true);
  }

  public commitEditText() {
    this.todoListService.updateItem(
      this.getTodoItem().get('id'),
      this.$editText.value,
      this.getTodoItem().get('isDone'),
    );

    this.$editText.next('');
    this.$isEditing.next(false);
  }

  public toggleComplete() {
    this.todoListService.updateItem(
      this.getTodoItem().get('id'),
      this.getTodoItem().get('text'),
      !this.getTodoItem().get('isDone'),
    );
  }

  public deleteItem() {
    this.todoListService.deleteItem(this.getTodoItem().get('id'));
  }
}
