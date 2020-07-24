import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@neon/core';

import { TodoItem } from '../models/todoItem.model';

@Injectable()
export class TodoListService {
  readonly items = new BehaviorSubject<TodoItem[]>([]);

  public loadItems() {
    this.items.next([
      new TodoItem('1', 'Buy some beer'),
      new TodoItem('2', 'Write some code'),
      new TodoItem('3', 'Get some sleep'),
    ]);
  }

  public addItem(text: string) {
    const id = this.items.value.length + 1;
    this.items.next([...this.items.value, new TodoItem(id.toString(), text)]);
  }

  public updateItem(id: string, text: string, isComplete: boolean) {
    const item = this.items.value.find(i => i.getId() === id);
    if (!item) {
      throw new Error(`Unable to find item with ID '${id}'`);
    }

    item.setText(text);
    item.setComplete(isComplete);
  }

  public deleteItem(id: string) {
    this.items.next(this.items.value.filter(item => item.getId() !== id));
  }
}
