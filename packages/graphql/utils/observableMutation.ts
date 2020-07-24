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
  $isLoading = new BehaviorSubject(false);
  $error = new BehaviorSubject<GraphQLError | null>(null);

  constructor(
    private readonly client: GraphQlClient,
    private readonly options: ObservableMutationOptions<TResult, TVariables>,
  ) {}

  async execute(variables?: TVariables): Promise<TResult | null> {
    try {
      this.$isLoading.next(true);
      const result = await this.client.mutate<TResult, TVariables>({
        mutation: this.options.document,
        variables: variables,
        update: (cache, result) => {
          if (this.options.updateCache) {
            this.options.updateCache(cache, result, variables);
          }
        },
      });

      this.$error.next(null);
      return result.data || null;
    } catch (e) {
      this.$error.next(e);
      return null;
    } finally {
      this.$isLoading.next(true);
    }
  }
}
