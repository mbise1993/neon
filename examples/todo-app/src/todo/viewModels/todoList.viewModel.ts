import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Inject, Injectable, Model } from '@neon/core';

import { Filter } from '../../common/utils/filter';
import { TodoItemFields } from 'todo/models/todoItem.model';
import { TodoListService } from '../services/todoList.service';

@Injectable()
export class TodoListViewModel {
  public constructor(@Inject(TodoListService) private todoListService: TodoListService) {}

  public newItemText = new BehaviorSubject('');

  public isToggleAllChecked = new BehaviorSubject(false);

  public filter = new BehaviorSubject(Filter.ALL);

  public hasItems = this.todoListService.$items.pipe(map(items => items.length > 0));

  public itemsLeftCount = this.todoListService.$items.pipe(
    map(items => items.filter(item => !item.get('isDone')).length),
  );

  public filteredItems = combineLatest(this.todoListService.$items, this.filter).pipe(
    map(([items, filter]) => this.filterItems(items, filter)),
  );

  public filterItems(items: Model<TodoItemFields>[], filter: Filter) {
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

  public addItem() {
    this.todoListService.addItem(this.newItemText.value);
    this.newItemText.next('');
  }

  public toggleAll() {
    for (const item of this.todoListService.$items.value) {
      this.todoListService.updateItem(item.get('id'), item.get('text'), !this.isToggleAllChecked);
    }

    this.isToggleAllChecked.next(!this.isToggleAllChecked.value);
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
}

// @Injectable()
// export class TodoListViewModel extends Observable {
//   private newItemText = '';
//   private isToggleAllChecked = false;
//   private filter = Filter.ALL;

//   public constructor(@Inject(TodoListService) private todoListService: TodoListService) {
//     super();
//   }

//   public getNewItemText() {
//     return this.newItemText;
//   }

//   public setNewItemText(value: string) {
//     this.newItemText = value;
//     this.notify();
//   }

//   public getIsToggleAllChecked() {
//     return this.isToggleAllChecked;
//   }

//   public setIsToggleAllChecked(value: boolean) {
//     this.isToggleAllChecked = value;
//     this.notify();
//   }

//   public getFilter() {
//     return this.filter;
//   }

//   public setFilter(value: Filter) {
//     this.filter = value;
//     this.notify();
//   }

//   public hasItems() {
//     return this.todoListService.$items.getValue().length > 0;
//   }

//   public getItemsLeftCount() {
//     return this.todoListService.$items.getValue().filter(item => !item.get('isDone')).length;
//   }

//   public getFilteredItems() {
//     const items = this.todoListService.$items.getValue();
//     return items.filter(item => {
//       if (this.filter === Filter.ACTIVE) {
//         return !item.get('isDone');
//       } else if (this.filter === Filter.COMPLETED) {
//         return item.get('isDone');
//       } else {
//         return items;
//       }
//     });
//   }

//   public addItem() {
//     this.todoListService.addItem(this.newItemText);
//     this.newItemText = '';
//     this.notify();
//   }

//   public toggleAll() {
//     for (const item of this.todoListService.$items.value) {
//       this.todoListService.updateItem(item.get('id'), item.get('text'), !this.isToggleAllChecked);
//     }

//     this.isToggleAllChecked = !this.isToggleAllChecked;
//     this.notify();
//   }

//   public clearCompletedItems() {
//     const completedItems = this.todoListService.$items.value.filter(item => item.get('isDone'));
//     for (const item of completedItems) {
//       this.todoListService.deleteItem(item.get('id'));
//     }

//     this.notify();
//   }

//   public deleteItem(itemId: string) {
//     this.todoListService.deleteItem(itemId);
//     this.notify();
//   }
// }
