import { BehaviorSubject } from 'rxjs';

import { Inject, Injectable, Model } from '@neon/core';

import { TodoItem } from '../models/todoItem.model';
import { TodoListService } from '../services/todoList.service';

@Injectable()
export class TodoItemViewModel {
  private model!: Model<TodoItem>;

  constructor(@Inject(TodoListService) private todoListService: TodoListService) {}

  public editText$ = new BehaviorSubject('');

  public isEditing$ = new BehaviorSubject(false);

  public modelFields$ = this.model.fields$;

  public setModel(model: Model<TodoItem>) {
    this.model = model;
  }

  public startEditing() {
    this.editText$.next(this.model.get('text'));
    this.isEditing$.next(true);
  }

  public handleEditTextChange(value: string) {
    this.editText$.next(value);
  }

  public handleKeyDown(keyCode: number) {
    // Enter
    if (keyCode === 13) {
      this.commitEditText();
    }
  }

  public commitEditText() {
    this.todoListService.updateItem(
      this.model.get('id'),
      this.editText$.value,
      this.model.get('isDone'),
    );

    this.editText$.next('');
    this.isEditing$.next(false);
  }

  public toggleComplete() {
    this.todoListService.updateItem(
      this.model.get('id'),
      this.model.get('text'),
      !this.model.get('isDone'),
    );
  }

  public deleteItem() {
    this.todoListService.deleteItem(this.model.get('id'));
  }
}
