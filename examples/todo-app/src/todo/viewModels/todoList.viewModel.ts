import { BehaviorSubject, combineLatest } from 'rxjs';
import { inject } from 'inversify';
import { map } from 'rxjs/operators';

import { Injectable } from '@neon/core';
import { ViewModel } from '@neon/react';

import { Filter } from '../../common/utils/filiter';
import { TodoItem } from '../models/todoItem.model';
import { TodoListService } from '../services/todoList.service';

interface Props {
  filter: Filter;
}

@Injectable()
export class TodoListViewModel extends ViewModel<Props> {
  private newItemText = new BehaviorSubject('');
  private toggleAllChecked = new BehaviorSubject(false);

  constructor(@inject(TodoListService) private readonly todoListService: TodoListService) {
    super();
  }

  $newItemText = this.newItemText.asObservable();

  setNewItemText(value: string) {
    this.newItemText.next(value);
  }

  $hasItems = this.todoListService.items.pipe(map(items => items.length > 0));

  $itemsLeftCount = this.todoListService.items.pipe(
    map(items => items.filter(item => !item.isComplete()).length),
  );

  public $filteredItems = combineLatest([this.todoListService.items, this.$props]).pipe(
    map(([items, props]) => this.filterItems(items, props.filter)),
  );

  public addItem() {
    this.todoListService.addItem(this.newItemText.value);
    this.newItemText.next('');
  }

  async toggleAll() {
    for (const item of this.todoListService.items.value) {
      this.todoListService.updateItem(item.getId(), item.getText(), !this.toggleAllChecked.value);
    }

    this.toggleAllChecked.next(!this.toggleAllChecked.value);
  }

  async clearCompletedItems() {
    const completedItems = this.todoListService.items.value.filter(item => item.isComplete());
    for (const item of completedItems) {
      this.todoListService.deleteItem(item.getId());
    }
  }

  public deleteItem(itemId: string) {
    this.todoListService.deleteItem(itemId);
  }

  private filterItems(items: TodoItem[], filter: Filter) {
    return items.filter(item => {
      if (filter === 'active') {
        return !item.isComplete();
      } else if (filter === 'completed') {
        return item.isComplete();
      } else {
        return items;
      }
    });
  }
}
