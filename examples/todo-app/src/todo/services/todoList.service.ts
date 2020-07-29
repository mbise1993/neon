import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@neon/core';

import { TodoItem } from '../models/todoItem.model';

@Injectable()
export class TodoListService {
  public readonly items$ = new BehaviorSubject<TodoItem[]>([]);

  public loadItems() {
    this.items$.next([
      { id: '1', text: 'Buy some beer', isDone: false },
      { id: '2', text: 'Write some code', isDone: false },
      { id: '3', text: 'Get some sleep', isDone: false },
    ]);
  }

  public addItem(text: string) {
    const id = this.items$.value.length + 1;
    this.items$.next([
      ...this.items$.value,
      {
        id: id.toString(),
        text,
        isDone: false,
      },
    ]);
  }

  public updateItem(id: string, text: string, isDone: boolean) {
    this.items$.next(
      this.items$.value.map(item => {
        if (item.id === id) {
          return { id, text, isDone };
        } else {
          return item;
        }
      }),
    );
  }

  public deleteItem(id: string) {
    this.items$.next(this.items$.value.filter(item => item.id !== id));
  }
}
