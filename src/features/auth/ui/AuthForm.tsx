"use client";
import { cn } from "@/shared/utils";
import { useMutation } from "@apollo/client/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { AuthFormData } from "@/shared/types/auth-form.types";

import { isEmailRegex } from "@/shared/utils/is-email.regex";

import { LoginDocument } from "@/shared/api/__generated__/graphql";
import { RegisterDocument } from "@/shared/api/__generated__/graphql";

import AuthChangeType from "./AuthChangeType";

interface Props {
  type: "login" | "register";
}

export function AuthForm({ type }: Props) {
  const isLogin = type === "login" ? true : false;
  /* 
  
  */
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
  /* 
  
  
  */
  const [auth, { loading }] = useMutation(
    isLogin ? LoginDocument : RegisterDocument,
    {
      onCompleted: () => {
        toast.success(
          isLogin ? "Login successful!" : "Registration successful!",
          { id: "auth-success" },
        );
      },
      onError: () => {
        toast.error("Email or password is incorrect!", { id: "auth-error" });
      },
    },
  );
  /* 
  
  
  */
  const handleAuth = (data: AuthFormData) => {
    auth({
      variables: {
        data,
      },
    });
  };
  /* 
  
  
  */
  return (
    <div className="flex h-screen">
      <div className="relation bg-linear-to-tr  from-violet-500 to-violet-400 w-sm m-auto text-primary-foreground p-5 shadow-lg rounded-2xl">
        <h1 className="text-center font-roboto font-extrabold text-4xl mb-5 mt-2">
          {isLogin ? "Sign In" : "Sign Up"}
        </h1>
        <form className="mt-5 space-y-4.5" onSubmit={handleSubmit(handleAuth)}>
          <div>
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
                "pt-4.5 pb-4 pl-3 ",
                errors.email && "border-red-500",
              )}
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
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
                "py-4.5 pl-3 pb-4 ",
                errors.password && "border-red-500",
              )}
            />
            {errors.password && (
              <p className="text-destructive text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="text-center">
            <Button
              variant={"secondary"}
              size={"lg"}
              disabled={!isValid || loading}
              type="submit"
            >
              {!isLogin ? "Register" : "Login"}
            </Button>
          </div>
        </form>
        <AuthChangeType isLogin={isLogin} />
        <Image
          src="/salad.png"
          className="absolute left-117 top-107 -rotate-15"
          alt="Salad"
          width={195}
          height={195}
          draggable={false}
        />
      </div>
    </div>
  );
}
