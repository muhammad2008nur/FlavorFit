"use server";
import { jwtVerify } from "jose";

import { Role } from "@/shared/api/__generated__/graphql";

type AuthTokenData = {
  id: string;
  role: Role;
};

export async function JwtVerifyServer(accessToken: string) {
  try {
    const { payload }: { payload: AuthTokenData } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY),
    );
    return payload;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("exp claim timestamp check failed")
    ) {
      console.log("Token has  expired");
      return null;
    }
    console.log("Error verifying JWT", error);
    return null;
  }
}
