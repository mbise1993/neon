import { BehaviorSubject } from 'rxjs';
import { inject } from 'inversify';

import { Injectable } from '@neon/core';
import { ViewModel } from '@neon/react';

import { TodoItem } from '../models/todoItem.model';
import { TodoListService } from '../services/todoList.service';

interface Props {
  todoItem: TodoItem;
}

@Injectable()
export class TodoItemViewModel extends ViewModel<Props> {
  private readonly editText = new BehaviorSubject('');
  private readonly isEditing = new BehaviorSubject(false);

  constructor(@inject(TodoListService) private readonly todoListService: TodoListService) {
    super();
  }

  public $editText = this.editText.asObservable();
  public $isEditing = this.isEditing.asObservable();

  public setEditText(value: string) {
    this.editText.next(value);
  }

  public getTodoItem() {
    return this.$props.value.todoItem;
  }

  public startEditing() {
    this.editText.next(this.getTodoItem().getText());
    this.isEditing.next(true);
  }

  public commitEditText() {
    this.todoListService.updateItem(
      this.getTodoItem().getId(),
      this.editText.value,
      this.getTodoItem().isComplete(),
    );

    this.editText.next('');
    this.isEditing.next(false);
  }

  public toggleComplete() {
    this.todoListService.updateItem(
      this.getTodoItem().getId(),
      this.getTodoItem().getText(),
      !this.getTodoItem().isComplete(),
    );
  }

  public deleteItem() {
    this.todoListService.deleteItem(this.getTodoItem().getId());
  }
}
