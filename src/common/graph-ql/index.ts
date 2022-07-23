import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';
import { graphQLapi } from '../../env';

export const graphClient = new ApolloClient({
    uri: graphQLapi,
    cache: new InMemoryCache(),
});