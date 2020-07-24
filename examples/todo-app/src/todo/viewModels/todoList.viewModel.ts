import { BehaviorSubject, combineLatest } from 'rxjs';
import { inject } from 'inversify';
import { map } from 'rxjs/operators';

import { Injectable } from '@neon/core';
import { ViewModel } from '@neon/react';

import { Filter } from '../../common/utils/filter';
import { Model, TodoItemFields } from '../models/todoItem.model';
import { TodoListService } from '../services/todoList.service';

interface Props {
  filter: Filter;
}

@Injectable()
export class TodoListViewModel extends ViewModel<Props> {
  constructor(@inject(TodoListService) private readonly todoListService: TodoListService) {
    super();
  }

  public $newItemText = new BehaviorSubject('');
  public $toggleAllChecked = new BehaviorSubject(false);
  public $hasItems = this.todoListService.$items.pipe(map(items => items.length > 0));
  public $itemsLeftCount = this.todoListService.$items.pipe(
    map(items => items.filter(item => !item.get('isDone')).length),
  );
  public $filteredItems = combineLatest([this.todoListService.$items, this.$props]).pipe(
    map(([items, props]) => this.filterItems(items, props.filter)),
  );

  public addItem() {
    this.todoListService.addItem(this.$newItemText.value);
    this.$newItemText.next('');
  }

  public toggleAll() {
    for (const item of this.todoListService.$items.value) {
      this.todoListService.updateItem(
        item.get('id'),
        item.get('text'),
        !this.$toggleAllChecked.value,
      );
    }

    this.$toggleAllChecked.next(!this.$toggleAllChecked.value);
  }

  public clearCompletedItems() {
    const completedItems = this.todoListService.$items.value.filter(item => item.get('isDone'));
    for (const item of completedItems) {
      this.todoListService.deleteItem(item.get('id'));
    }
  }

  public deleteItem(itemId: string) {
    this.todoListService.deleteItem(itemId);
  }

  private filterItems(items: Model<TodoItemFields>[], filter: Filter) {
    return items.filter(item => {
      if (filter === Filter.ACTIVE) {
        return !item.get('isDone');
      } else if (filter === Filter.COMPLETED) {
        return item.get('isDone');
      } else {
        return items;
      }
    });
  }
}
