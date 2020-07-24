import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@neon/core';
import { ViewModel } from '@neon/react';

import { Filter } from '../../common/utils/filiter';
import { TodoItem } from 'todo/models/todoItem.model';
import { TodoListService } from '../services/todoList.service';

interface Props {
  filter: Filter;
}

@Injectable()
export class TodoListViewModel extends ViewModel<Props> {
  constructor(private readonly todoListService: TodoListService) {
    super();
  }

  public $filteredItems = combineLatest([this.todoListService.items, this.$props]).pipe(
    map(([items, props]) => this.filterItems(items, props.filter)),
  );

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
