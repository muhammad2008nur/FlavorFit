import { CombinedGraphQLErrors, Observable } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";

import { NewTokenDocument } from "@/shared/api/__generated__/graphql";

import { simpleApolloClient } from "../apollo-client";

export const errorLink = new ErrorLink(({ operation, error, forward }) => {
  if (CombinedGraphQLErrors.is(error)) {
    for (const err of error.errors) {
      if (err.extensions?.code == "UNAUTHENTICATED") {
        return new Observable((observer) => {
          simpleApolloClient
            .query({
              query: NewTokenDocument,
              fetchPolicy: "no-cache",
            })
            .then(() => {
              forward(operation).subscribe(observer);
            })
            .catch((err) => {
              observer.error(err);
            });
        });
      }
    }
  }
  return;
});
