import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@neon/core';

import { Model, TodoItemFields } from '../models/todoItem.model';

@Injectable()
export class TodoListService {
  public readonly $items = new BehaviorSubject<Model<TodoItemFields>[]>([]);

  public loadItems() {
    // this.items.next([
    //   new TodoItem('1', 'Buy some beer'),
    //   new TodoItem('2', 'Write some code'),
    //   new TodoItem('3', 'Get some sleep'),
    // ]);

    this.$items.next([
      new Model<TodoItemFields>({ id: '1', text: 'Buy some beer' }),
      new Model<TodoItemFields>({ id: '2', text: 'Write some code' }),
      new Model<TodoItemFields>({ id: '3', text: 'Get some sleep' }),
    ]);
  }

  public addItem(text: string) {
    const id = this.$items.value.length + 1;
    const newItem = new Model<TodoItemFields>({ id: id.toString(), text });

    this.$items.next([...this.$items.value, newItem]);
  }

  public updateItem(id: string, text: string, isDone: boolean | undefined) {
    const itemToUpdate = this.$items.value.find(item => item.get('id') === id);
    if (!itemToUpdate) {
      throw new Error(`Unable to find item with ID '${id}'`);
    }

    itemToUpdate.set({
      text,
      isDone,
    });
  }

  public deleteItem(id: string) {
    this.$items.next(this.$items.value.filter(item => item.get('id') !== id));
  }
}
