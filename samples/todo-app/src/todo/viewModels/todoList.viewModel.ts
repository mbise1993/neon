import { injectable } from 'inversify';

import { combineLatest } from 'rxjs';
import { Filter } from '../../common/utils/filiter';
import { map } from 'rxjs/operators';
import { TodoItemFields } from '../api/todoItemFields.generated';
import { TodoItemService } from '../services/todoItem.service';
import { TodoListService } from '../services/todoList.service';
import { ViewModel } from '../../common/viewModels';

interface Props {
  filter: Filter;
}

@injectable()
export class TodoListViewModel extends ViewModel<Props> {
  constructor(
    private readonly todoListService: TodoListService,
    private readonly todoItemService: TodoItemService,
  ) {
    super();
  }

  $filteredItems = combineLatest([this.todoListService.items, this.$props]).pipe(
    map(([items, props]) => this.filterItems(items, props.filter)),
  );

  async deleteItem(itemId: string) {
    await this.todoItemService.deleteItem.execute({
      id: itemId,
    });
  }

  private filterItems(items: TodoItemFields[], filter: Filter) {
    return items.filter(item => {
      if (filter === 'active') {
        return !item.done;
      } else if (filter === 'completed') {
        return item.done;
      } else {
        return items;
      }
    });
  }
}
