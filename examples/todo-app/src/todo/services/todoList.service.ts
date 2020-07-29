import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@neon/core';

import { TodoItem } from '../models/todoItem.model';

let nextId = 4;

@Injectable()
export class TodoListService {
  private readonly _items = new BehaviorSubject<TodoItem[]>([]);

  public readonly items$ = this._items.asObservable();

  public get items() {
    return this._items.value;
  }

  public loadItems() {
    this._items.next([
      { id: '1', text: 'Buy some beer', isDone: false },
      { id: '2', text: 'Write some code', isDone: false },
      { id: '3', text: 'Get some sleep', isDone: false },
    ]);
  }

  public addItem(text: string) {
    const newItems = this.items.concat({
      id: nextId.toString(),
      text,
      isDone: false,
    });

    nextId += 1;
    this._items.next(newItems);
  }

  public updateItem(id: string, text: string, isDone: boolean) {
    const newItems = this.items.map(item => (item.id === id ? { id, text, isDone } : item));
    this._items.next(newItems);
  }

  public deleteItem(id: string) {
    this._items.next(this.items.filter(item => item.id !== id));
  }
}
