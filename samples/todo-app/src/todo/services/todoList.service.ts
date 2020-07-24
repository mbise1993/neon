import { ApolloCache, ApolloQueryResult, FetchResult } from '@apollo/client';
import { BehaviorSubject } from 'rxjs';
import { injectable } from 'inversify';

import { AppService } from '../../app/services/app.service';
import {
  CreateTodoItem,
  CreateTodoItemDocument,
  CreateTodoItemVariables,
} from '../api/CreateTodoItem.generated';
import {
  GetTodoItems,
  GetTodoItemsDocument,
  GetTodoItemsVariables,
} from '../api/GetTodoItems.generated';
import { GraphQLClient } from '../../common/services/graphQLClient';
import { GraphQLService } from '../../common/services/graphQL.service';
import { TodoItemFields } from '../api/todoItemFields.generated';

@injectable()
export class TodoListService extends GraphQLService {
  readonly items = new BehaviorSubject<TodoItemFields[]>([]);

  constructor(client: GraphQLClient, appService: AppService) {
    super(client);

    this.getItems.watch({
      userId: parseInt(appService.activeUser.id),
    });
  }

  get id() {
    return '1';
  }

  getItems = this.createQuery<GetTodoItems, GetTodoItemsVariables>({
    document: GetTodoItemsDocument,
    onNext: result => this.onNext(result),
  });

  addItem = this.createMutation<CreateTodoItem, CreateTodoItemVariables>({
    document: CreateTodoItemDocument,
    updateCache: (cache, result) => this.updateCacheAfterCreate(cache, result),
  });

  private updateCacheAfterCreate(
    cache: ApolloCache<CreateTodoItem>,
    result: FetchResult<CreateTodoItem>,
  ) {
    if (!result.data) {
      return;
    }

    const cachedData = cache.readQuery<GetTodoItems, GetTodoItemsVariables>({
      query: GetTodoItemsDocument,
    });

    if (!cachedData) {
      return;
    }

    cache.writeQuery<GetTodoItems, GetTodoItemsVariables>({
      query: GetTodoItemsDocument,
      data: {
        ...cachedData,
        todos: [...cachedData.todos, result.data.createTodo],
      },
    });
  }

  private onNext(result: ApolloQueryResult<GetTodoItems>) {
    if (!result.data?.todos) {
      return;
    }

    this.items.next(result.data.todos as any);
  }
}
