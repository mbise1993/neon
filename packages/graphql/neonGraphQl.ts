import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import { Container } from '@neon/core';
import { GraphQlClient } from 'services/graphQlClient';

export interface NeonGraphQlOptions {
  uri: string;
}

export class NeonGraphQl {
  public static attach(container: Container, options: NeonGraphQlOptions) {
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: options.uri,
      }),
    });

    container.bind(GraphQlClient).toConstantValue(client);
  }
}
