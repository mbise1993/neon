import { BehaviorSubject } from 'rxjs';
import { injectable } from 'inversify';
import { map } from 'rxjs/operators';

import { AppService } from '../services/app.service';
import { TodoItemService } from '../../todo/services/todoItem.service';
import { TodoListService } from '../../todo/services/todoList.service';
import { ViewModel } from '../../common/viewModels';

@injectable()
export class AppViewModel extends ViewModel {
  private newItemText = new BehaviorSubject('');
  private toggleAllChecked = new BehaviorSubject(false);

  constructor(
    private readonly appService: AppService,
    private readonly todoListService: TodoListService,
    private readonly todoItemService: TodoItemService,
  ) {
    super();
  }

  $newItemText = this.newItemText.asObservable();

  setNewItemText(value: string) {
    this.newItemText.next(value);
  }

  $hasItems = this.todoListService.items.pipe(map(items => items.length > 0));

  $itemsLeftCount = this.todoListService.items.pipe(
    map(items => items.filter(item => !item.done).length),
  );

  async addItem() {
    await this.todoListService.addItem.execute({
      input: {
        user_id: this.appService.activeUser.id,
        task: this.newItemText.value,
        done: false,
      },
    });

    this.newItemText.next('');
  }

  async toggleAll() {
    for (const item of this.todoListService.items.value) {
      await this.todoItemService.updateItem.execute({
        id: item.id,
        input: {
          done: !this.toggleAllChecked.value,
        } as any,
      });
    }

    this.toggleAllChecked.next(!this.toggleAllChecked.value);
  }

  async clearCompletedItems() {
    const completedItems = this.todoListService.items.value.filter(item => item.done);
    for (const item of completedItems) {
      await this.todoItemService.deleteItem.execute({
        id: item.id,
      });
    }
  }
}
