"use client";
import { cn } from "@/shared/utils";
import { useMutation } from "@apollo/client/react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { AuthFormData } from "@/shared/types/auth-form.types";

import { isEmailRegex } from "@/shared/utils/is-email.regex";

import { RequestPasswordResetDocument } from "@/shared/api/__generated__/graphql";

import AuthImage from "./AuthImage";

export function ResetPasswordRequest() {
  const ref = React.useRef<TurnstileInstance | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY;
  const [turnstileToken, setTurnstileToken] = React.useState<string | null>(
    null,
  );

  /*

  */
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthFormData>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const [resetPassword, { loading }] = useMutation(
    RequestPasswordResetDocument,
  );

  const handleReset = async (data: AuthFormData) => {
    if (!turnstileToken) {
      toast.error("Please complete captcha");
      return;
    }
    try {
      const result = await resetPassword({
        variables: {
          data,
        },
        context: {
          headers: {
            "cf-turnstile-token": turnstileToken,
          },
        },
      });

      const response = result.data;
      if (!response) return;

      toast.success("Reset password successful!", { id: "reset-success" });

      //   router.replace(PAGES.DASHBOARD);
    } catch (error) {
      toast.error("Reset password request failed", { id: "reset-error" });
      console.error("Reset password request error:", error);
      setTurnstileToken(null);
      ref.current?.reset();
    }
  };
  /*


  */
  return (
    <div className="flex h-screen">
      {turnstileSiteKey && (
        <Turnstile
          className="fixed bottom-4 right-4"
          ref={ref}
          siteKey={turnstileSiteKey}
          onError={() => {
            setTurnstileToken(null);
            ref.current?.reset();
          }}
          onSuccess={(token) => {
            setTurnstileToken(token);
          }}
          onExpire={() => {
            setTurnstileToken(null);
          }}
        />
      )}

      <div className="relative bg-linear-to-tr  from-violet-500 to-violet-400 w-sm m-auto text-primary-foreground p-5 shadow-lg rounded-2xl">
        <h1 className="text-center font-roboto font-extrabold text-4xl mb-5 mt-2">
          Reset password
        </h1>
        <form
          className="mt-5 space-y-4.5"
          onSubmit={(event) => {
            void handleSubmit(handleReset)(event);
          }}
        >
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

          <div className="text-center">
            <Button
              variant={"secondary"}
              size={"lg"}
              disabled={!isValid || loading || !turnstileToken}
              type="submit"
            >
              Reset{" "}
            </Button>
          </div>
        </form>
        <AuthImage />
      </div>
    </div>
  );
}
