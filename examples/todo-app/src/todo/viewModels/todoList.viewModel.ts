import { Inject, Injectable, Observable } from '@neon/core';

import { Filter } from '../../common/utils/filter';
import { TodoListService } from '../services/todoList.service';

@Injectable()
export class TodoListViewModel extends Observable {
  private newItemText = '';
  private isToggleAllChecked = false;
  private filter = Filter.ALL;

  public constructor(@Inject(TodoListService) private todoListService: TodoListService) {
    super();
  }

  public getNewItemText() {
    return this.newItemText;
  }

  public setNewItemText(value: string) {
    this.newItemText = value;
    this.notify();
  }

  public getIsToggleAllChecked() {
    return this.isToggleAllChecked;
  }

  public setIsToggleAllChecked(value: boolean) {
    this.isToggleAllChecked = value;
    this.notify();
  }

  public getFilter() {
    return this.filter;
  }

  public setFilter(value: Filter) {
    this.filter = value;
    this.notify();
  }

  public hasItems() {
    return this.todoListService.$items.getValue().length > 0;
  }

  public getItemsLeftCount() {
    return this.todoListService.$items.getValue().filter(item => !item.get('isDone')).length;
  }

  public getFilteredItems() {
    const items = this.todoListService.$items.getValue();
    return items.filter(item => {
      if (this.filter === Filter.ACTIVE) {
        return !item.get('isDone');
      } else if (this.filter === Filter.COMPLETED) {
        return item.get('isDone');
      } else {
        return items;
      }
    });
  }

  public addItem() {
    this.todoListService.addItem(this.newItemText);
    this.newItemText = '';
    this.notify();
  }

  public toggleAll() {
    for (const item of this.todoListService.$items.value) {
      this.todoListService.updateItem(item.get('id'), item.get('text'), !this.isToggleAllChecked);
    }

    this.isToggleAllChecked = !this.isToggleAllChecked;
    this.notify();
  }

  public clearCompletedItems() {
    const completedItems = this.todoListService.$items.value.filter(item => item.get('isDone'));
    for (const item of completedItems) {
      this.todoListService.deleteItem(item.get('id'));
    }

    this.notify();
  }

  public deleteItem(itemId: string) {
    this.todoListService.deleteItem(itemId);
    this.notify();
  }
}
