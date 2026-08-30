"use server";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/shared/constants/app.constants";
import { CombinedGraphQLErrors } from "@apollo/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { GRAPHQL_SERVER_URL } from "@/shared/config/api.config";
import { PAGES } from "@/shared/config/page.config";

import {
  NewTokenDocument,
  NewTokenQuery,
} from "@/shared/api/__generated__/graphql";

import { getApolloClient } from "../apollo/apollo-client";

export async function getTokens(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;
  if (!refreshToken) {
    request.cookies.delete(REFRESH_TOKEN);
    return null;
  }
  if (!accessToken) {
    try {
      const refreshResponse = await fetch(GRAPHQL_SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: request.headers.get("cookie") ?? "",
        },
        body: JSON.stringify({
          query: `query {
              newTokens {
                  user {
                      id                  
                  }
              }
          }`,
        }),
      });
      if (!refreshResponse.ok) {
        return null;
      }
      const setCookie = refreshResponse.headers.get("set-cookie");

      return {
        isRefreshed: true,
        setCookie,
      };
    } catch (error) {
      if (CombinedGraphQLErrors.is(error)) {
        const isInvalid = error.errors.some(
          (e) =>
            e.message === "invalid token" ||
            e.extensions?.code === "UNAUTHENTICATED",
        );
        if (isInvalid) {
          request.cookies.delete(ACCESS_TOKEN);
          request.cookies.delete(REFRESH_TOKEN);

          return null;
        }
      }
    }

    return null;
  }
  return {
    refreshToken,
    accessToken,
  };
}
