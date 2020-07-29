import { ApolloCache, FetchResult } from '@apollo/client';
import { BehaviorSubject } from 'rxjs';
import { DocumentNode, GraphQLError } from 'graphql';

import { GraphQlClient } from '../services/graphQlClient';

export interface ObservableMutationOptions<TResult, TVariables> {
  document: DocumentNode;
  updateCache?(
    cache: ApolloCache<TResult>,
    result: FetchResult<TResult>,
    variables?: TVariables,
  ): void;
}

export class ObservableMutation<TResult, TVariables> {
  public readonly _isLoading = new BehaviorSubject(false);
  public readonly _error = new BehaviorSubject<GraphQLError | null>(null);

  public constructor(
    private readonly client: GraphQlClient,
    private readonly options: ObservableMutationOptions<TResult, TVariables>,
  ) {}

  public readonly isLoading$ = this._isLoading.asObservable();
  public readonly error$ = this._error.asObservable();

  public async execute(variables?: TVariables): Promise<TResult | null> {
    try {
      this._isLoading.next(true);
      const result = await this.client.mutate<TResult, TVariables>({
        mutation: this.options.document,
        variables: variables,
        update: (cache, result) => {
          if (this.options.updateCache) {
            this.options.updateCache(cache, result, variables);
          }
        },
      });

      this._error.next(null);
      return result.data || null;
    } catch (e) {
      this._error.next(e);
      return null;
    } finally {
      this._isLoading.next(true);
    }
  }
}
