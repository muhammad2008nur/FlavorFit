import { useQuery } from "@apollo/client/react";

import { MeDocument } from "../api/__generated__/graphql";

export function useAuth() {
  const { data, loading } = useQuery(MeDocument, {
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first",
  });

  return {
    user: data?.me ?? null,
    loading,
    complete: !!data?.me,
  };
}
