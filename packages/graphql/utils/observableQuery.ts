import { ObservableQuery as ApolloObservableQuery, ApolloQueryResult } from '@apollo/client';
import { BehaviorSubject } from 'rxjs';
import { DocumentNode, GraphQLError } from 'graphql';

import { GraphQlClient } from '../services/graphQlClient';

interface Subscription {
  closed: boolean;
  unsubscribe(): void;
}

export interface ObservableQueryOptions<TResult> {
  document: DocumentNode;
  onNext?(result: ApolloQueryResult<TResult>): void;
  onError?(error: any): void;
}

export class ObservableQuery<TResult, TVariables> {
  private observable?: ApolloObservableQuery<TResult, TVariables>;
  private subscriptions: Subscription[] = [];

  $isLoading = new BehaviorSubject(false);
  $error = new BehaviorSubject<GraphQLError | null>(null);

  constructor(
    private readonly client: GraphQlClient,
    private readonly options: ObservableQueryOptions<TResult>,
  ) {}

  async fetch(variables?: TVariables) {
    try {
      this.$isLoading.next(true);
      const result = await this.client.query<TResult, TVariables>({
        query: this.options.document,
        variables,
      });

      this.$error.next(null);
      return result;
    } catch (e) {
      this.$error.next(e);
    } finally {
      this.$isLoading.next(false);
    }
  }

  watch(variables?: TVariables) {
    this.observable = this.client.watchQuery<TResult, TVariables>({
      query: this.options.document,
      variables: variables,
      notifyOnNetworkStatusChange: true,
    });

    const subscripition = this.observable.subscribe({
      next: result => {
        this.onNext(result);
        if (this.options.onNext) {
          this.options.onNext(result);
        }
      },
      error: error => {
        if (this.options.onError) {
          this.options.onError(error);
        }
      },
    });

    this.subscriptions.push(subscripition);
  }

  dispose() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

  private onNext(result: ApolloQueryResult<TResult>) {
    this.$isLoading.next(result.loading);
    if (result.errors && result.errors.length > 0) {
      this.$error.next(result.errors[0]);
    }
  }
}
