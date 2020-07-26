import { Inject, Injectable, Model, Observable } from '@neon/core';

import { TodoItemFields } from '../models/todoItem.model';
import { TodoListService } from '../services/todoList.service';

@Injectable()
export class TodoItemViewModel extends Observable {
  private model!: Model<TodoItemFields>;
  private editText = '';
  private isEditing = false;

  constructor(@Inject(TodoListService) private todoListService: TodoListService) {
    super();
  }

  public setModel(model: Model<TodoItemFields>) {
    this.model = model;
  }

  public getText() {
    return this.model.get('text');
  }

  public getIsDone() {
    return this.model.get('isDone');
  }

  public getEditText() {
    return this.editText;
  }

  public setEditText(value: string) {
    this.editText = value;
    this.notify();
  }

  public getIsEditing() {
    return this.isEditing;
  }

  public startEditing() {
    this.editText = this.model.get('text');
    this.isEditing = true;
    this.notify();
  }

  public commitEditText() {
    this.todoListService.updateItem(
      this.model.get('id'),
      this.getEditText(),
      this.model.get('isDone'),
    );

    this.editText = '';
    this.isEditing = false;
    this.notify();
  }

  public toggleComplete() {
    this.todoListService.updateItem(
      this.model.get('id'),
      this.model.get('text'),
      !this.model.get('isDone'),
    );

    this.notify();
  }

  public deleteItem() {
    this.todoListService.deleteItem(this.model.get('id'));
  }
}
