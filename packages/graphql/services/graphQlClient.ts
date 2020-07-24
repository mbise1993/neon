import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

export class GraphQlClient extends ApolloClient<NormalizedCacheObject> {}

export const graphQlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://fakeql.com/graphql/ca0a81afa025e0427dd9d32c0675e6bf',
  }),
});
