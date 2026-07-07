import { IS_CLIENT } from "@/shared/constants/app.constants";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloLink } from "@apollo/client";

import { errorLink } from "./links/apollo-error.link";
import { httpLink } from "./links/apollo-http.link";

const clientApolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  devtools: {
    enabled: true,
  },
});
export const simpleApolloClient = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
  devtools: {
    enabled: true,
  },
});

const serverApolloClient = new ApolloClient({
  ssrMode: true,
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
  devtools: {
    enabled: false,
  },
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

export function getApolloClient() {
  return IS_CLIENT ? clientApolloClient : serverApolloClient;
}
