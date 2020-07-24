import { ApolloCache } from '@apollo/client';
import { injectable } from 'inversify';

import {
  DeleteTodoItem,
  DeleteTodoItemDocument,
  DeleteTodoItemVariables,
} from '../api/DeleteTodoItem.generated';
import {
  GetTodoItems,
  GetTodoItemsDocument,
  GetTodoItemsVariables,
} from '../api/GetTodoItems.generated';
import { GraphQLClient } from '../../common/services/graphQLClient';
import { GraphQLService } from '../../common/services/graphQL.service';
import {
  UpdateTodoItem,
  UpdateTodoItemDocument,
  UpdateTodoItemVariables,
} from '../api/UpdateTodoItem.generated';

@injectable()
export class TodoItemService extends GraphQLService {
  constructor(client: GraphQLClient) {
    super(client);
  }

  updateItem = this.createMutation<UpdateTodoItem, UpdateTodoItemVariables>({
    document: UpdateTodoItemDocument,
  });

  deleteItem = this.createMutation<DeleteTodoItem, DeleteTodoItemVariables>({
    document: DeleteTodoItemDocument,
    updateCache: (cache, _result, variables) => this.updateCacheAfterDelete(cache, variables),
  });

  private updateCacheAfterDelete(
    cache: ApolloCache<DeleteTodoItem>,
    variables?: DeleteTodoItemVariables,
  ) {
    if (!variables) {
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
        todos: cachedData.todos!.filter(todo => todo!.id !== variables.id),
      },
    });
  }
}
