import { injectable } from 'inversify';

import { BehaviorSubject } from 'rxjs';
import { TodoItemFields } from '../api/todoItemFields.generated';
import { TodoItemService } from '../services/todoItem.service';
import { ViewModel } from '../../common/viewModels';

interface Props {
  todoItem: TodoItemFields;
}

@injectable()
export class TodoItemViewModel extends ViewModel<Props> {
  private readonly editText = new BehaviorSubject('');
  private readonly isEditing = new BehaviorSubject(false);

  constructor(private readonly todoItemService: TodoItemService) {
    super();
  }

  $editText = this.editText.asObservable();

  setEditText(value: string) {
    this.editText.next(value);
  }

  $isEditing = this.isEditing.asObservable();

  get todoItem() {
    return this.$props.value.todoItem;
  }

  startEditing() {
    this.editText.next(this.todoItem.task);
    this.isEditing.next(true);
  }

  async commitEditText() {
    await this.todoItemService.updateItem.execute({
      id: this.todoItem.id,
      input: {
        task: this.editText.value,
      } as any,
    });

    this.editText.next('');
    this.isEditing.next(false);
  }

  async toggleComplete() {
    await this.todoItemService.updateItem.execute({
      id: this.todoItem.id,
      input: {
        done: !this.todoItem.done,
      } as any,
    });
  }

  async deleteItem() {
    await this.todoItemService.deleteItem.execute({
      id: this.todoItem.id,
    });
  }
}
