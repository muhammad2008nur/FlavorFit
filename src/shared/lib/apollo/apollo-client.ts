import { ApolloClient, InMemoryCache } from "@apollo/client";
import { httpLink } from "./links/apollo-http.link";
import { ApolloLink } from "@apollo/client";
import { IS_CLIENT } from "@/shared/constants/app.constants";
const сlientApolloClient = new ApolloClient({
  link: ApolloLink.from([httpLink]),
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
  return IS_CLIENT ? сlientApolloClient : serverApolloClient;
}
