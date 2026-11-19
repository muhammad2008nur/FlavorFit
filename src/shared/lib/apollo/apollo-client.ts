import { IS_CLIENT } from "@/shared/constants/app.constants";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloLink } from "@apollo/client";

import { RecipeModel } from "@/shared/api/__generated__/graphql";

import { errorLink } from "./links/apollo-error.link";
import { httpLink } from "./links/apollo-http.link";

const clientApolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feedRecipes: {
            keyArgs: ["data", ["sort", "searchTerm"]],
            merge(existing = [], incoming, { readField, args }) {
              if (!args?.data?.cursor) return incoming;
              const merged = [...existing];
              const set = new Set();

              merged.forEach((item: RecipeModel) => {
                set.add(readField("id", item));
              });

              incoming.forEach((item: RecipeModel) => {
                if (!set.has(readField("id", item))) {
                  merged.push(item);
                }
              });
              return merged;
            },
            // read(existing, { readField }) {
            //   if (!existing) return;

            //   return [...existing.values()].sort((a, b) => {
            //     const likesDifference =
            //       Number(readField("likesCount", b)) -
            //       Number(readField("likesCount", a));

            //     if (likesDifference !== 0) {
            //       return likesDifference;
            //     }

            //     const titleA = String(readField("title", a) ?? "");
            //     const titleB = String(readField("title", b) ?? "");

            //     return titleA.localeCompare(titleB);
            //   });
            // },
          },
        },
      },
    },
  }),
  devtools: {
    enabled: true,
    name: "main",
  },
});
export const simpleApolloClient = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
  devtools: {
    enabled: false,
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
