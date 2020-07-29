import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { HistoryService, Inject, Injectable, Model } from '@neon/core';

import { Filter, getFilterFromPath } from '../../common/utils/filter';
import { TodoItem } from '../models/todoItem.model';
import { TodoListService } from '../services/todoList.service';

@Injectable()
export class TodoListViewModel {
  public constructor(
    @Inject(TodoListService) private todoListService: TodoListService,
    @Inject(HistoryService) private historyService: HistoryService,
  ) {}

  public newItemText$ = new BehaviorSubject('');

  public isToggleAllChecked$ = new BehaviorSubject(false);

  public hasItems$ = this.todoListService.items$.pipe(map(items => items.length > 0));

  public itemsLeftCount$ = this.todoListService.items$.pipe(
    map(items => items.filter(item => !item.get('isDone')).length),
  );

  public filteredItems$ = combineLatest([
    this.historyService.location,
    this.todoListService.items$,
  ]).pipe(
    map(([location, items]) => this.filterItems(items, getFilterFromPath(location.pathname))),
  );

  public addItem() {
    this.todoListService.addItem(this.newItemText$.value);
    this.newItemText$.next('');
  }

  public toggleAll() {
    for (const item of this.todoListService.items$.value) {
      this.todoListService.updateItem(item.get('id'), item.get('text'), !this.isToggleAllChecked$);
    }

    this.isToggleAllChecked$.next(!this.isToggleAllChecked$.value);
  }

  public clearCompletedItems() {
    const completedItems = this.todoListService.items$.value.filter(item => item.get('isDone'));
    for (const item of completedItems) {
      this.todoListService.deleteItem(item.get('id'));
    }
  }

  public deleteItem(itemId: string) {
    this.todoListService.deleteItem(itemId);
  }

  private filterItems(items: Model<TodoItem>[], filter: Filter) {
    console.log(`filtering: ${filter}`);
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
