"use client";

import { ApolloProvider } from "@apollo/client/react";
import { Toaster } from "react-hot-toast";

import { getApolloClient } from "@/shared/lib/apollo/apollo-client";

export function Provider({ children }: { children: React.ReactNode }) {
  const apollo = getApolloClient();
  return (
    <ApolloProvider client={apollo}>
      {children}
      <Toaster position="top-center" />
    </ApolloProvider>
  );
}
