"use client";

import { isEmailRegex } from "@/shared/utills/is-email.regex";
import { useMutation } from "@apollo/client/react";
import { useForm } from "react-hook-form";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { AuthFormData } from "@/shared/types/auth-form.types";

import { LoginDocument } from "@/shared/api/__generated__/graphql";
import { RegisterDocument } from "@/shared/api/__generated__/graphql";

import { cn } from "../../../shared/utills/index";
import AuthChangeType from "./AuthChangeType";

interface Props {
  type: "login" | "register";
}
export function AuthForm({ type }: Props) {
  const isLogin = type === "login" ? true : false;

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<AuthFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    delayError: 600,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [auth, { loading }] = useMutation(
    isLogin ? LoginDocument : RegisterDocument,
  );
  const handleAuth = (data: AuthFormData) => {
    auth({
      variables: {
        data,
      },
    });
  };
  return (
    <div className="flex h-screen">
      <div className="bg-linear-to-tr from-violet-500 to-violet-400 w-sm m-auto text-white p-5 shadow-lg ">
        <h1 className="text-center font-medium text-4xl mb-5">
          {isLogin ? "Login" : "Register"}
        </h1>
        <form className="space-y-3" onSubmit={handleSubmit(handleAuth)}>
          <Input
            {...register("email", {
              required: "Поле обязательное",
              pattern: {
                value: isEmailRegex,
                message: "Введите корректный email",
              },
            })}
            type="email"
            placeholder="Enter email:"
            className={cn(
              "border border-transparent transition-colors",
              errors.email && "border-red-500",
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <Input
            {...register("password", {
              required: "Поле обязательное",
              minLength: {
                value: 6,
                message: "Пароль должен быть не менее 6 символов",
              },
            })}
            type="password"
            placeholder="Enter password:"
            className={cn(
              "border border-transparent transition-colors",
              errors.password && "border-red-500",
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <div className="text-center">
            <Button disabled={loading} type="submit">
              {!isLogin ? "Register" : "Login"}
            </Button>
          </div>
        </form>
        <div className="mt-3 text-center"></div>
        <AuthChangeType isLogin={isLogin} />
      </div>
    </div>
  );
}
