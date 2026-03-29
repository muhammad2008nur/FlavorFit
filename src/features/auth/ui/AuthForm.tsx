"use client";

import { useMutation } from "@apollo/client/react";
import Link from "next/link";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { LoginDocument } from "@/shared/api/__generated__/graphql";
import { RegisterDocument } from "@/shared/api/__generated__/graphql";

import { PAGES } from "../../../shared/config/page.config";

interface Props {
  type: "login" | "register";
}
export function AuthForm({ type }: Props) {
  const isLogin = type === "login" ? true : false;
  const [register, { data, loading, error }] = useMutation(
    isLogin ? LoginDocument : RegisterDocument,
  );
  // register({
  //   variables: {
  //     data: {
  //       email: "",
  //       password: "",
  //     },
  //   },
  // });
  return (
    <div className="flex h-screen">
      <div className="bg-linear-to-tr from-violet-500 to-violet-400 w-sm m-auto text-white p-5 shadow- ">
        <h1 className="text-center font-medium text-4xl mb-5">
          {isLogin ? "Login" : "Register"}
        </h1>
        <form className="space-y-3">
          <Input name="email" placeholder="Email" required />
          <div className="text-center">
            <Button disabled={loading} type="submit">
              {!isLogin ? "Register" : "Login"}
            </Button>
          </div>
        </form>
        <div className="mt-3 text-center">
          {isLogin ? (
            <div>
              Don&apos;t have an account ?{" "}
              <Link href={PAGES.REGISTER} className="underline ml-1 ">
                Register
              </Link>
            </div>
          ) : (
            <div>
              Already have an account ?{" "}
              <Link href={PAGES.LOGIN} className="underline">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
