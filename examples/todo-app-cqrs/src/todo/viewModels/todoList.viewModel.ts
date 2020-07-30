import { Inject, Injectable, ViewModel } from '@neon/core';

import { Filter } from '../../common/utils/filter';
import { TodoItem } from '../models/todoItem.model';
import { TodoListService } from '../services/todoList.service';

interface State {
  filter: Filter;
  newItemText: string;
  isToggleAllChecked: boolean;
  filteredItems: TodoItem[];
  hasItems: boolean;
  itemsLeftCount: number;
}

@Injectable()
export class TodoListViewModel extends ViewModel<State> {
  public constructor(@Inject(TodoListService) private todoListService: TodoListService) {
    super({
      filter: Filter.ALL,
      newItemText: '',
      isToggleAllChecked: false,
      filteredItems: [],
      hasItems: false,
      itemsLeftCount: 0,
    });

    this.subscribe(this.todoListService.items$, items => {
      this.setState({
        filteredItems: this.filterItems(items, this.state.filter),
        hasItems: items.length > 0,
        itemsLeftCount: items.filter(item => !item.isDone).length,
      });
    });

    this.subscribe(this.observe('filter'), filter => {
      this.setState({
        filteredItems: this.filterItems(this.todoListService.items, filter),
      });
    });

    this.todoListService.loadItems();
  }

  public addItem() {
    this.todoListService.addItem(this.state.newItemText);

    this.setState({ newItemText: '' });
  }

  public updateItem(itemId: string, text: string, isDone: boolean) {
    this.todoListService.updateItem(itemId, text, isDone);
  }

  public toggleAll() {
    for (const item of this.todoListService.items) {
      this.todoListService.updateItem(item.id, item.text, !this.state.isToggleAllChecked);
    }

    this.setState({ isToggleAllChecked: !this.state.isToggleAllChecked });
  }

  public clearCompletedItems() {
    const completedItems = this.todoListService.items.filter(item => item.isDone);
    for (const item of completedItems) {
      this.todoListService.deleteItem(item.id);
    }
  }

  public deleteItem(itemId: string) {
    this.todoListService.deleteItem(itemId);
  }

  private filterItems(items: TodoItem[], filter: Filter) {
    return items.filter(item => {
      if (filter === Filter.ACTIVE) {
        return !item.isDone;
      } else if (filter === Filter.COMPLETED) {
        return item.isDone;
      } else {
        return items;
      }
    });
  }
}
