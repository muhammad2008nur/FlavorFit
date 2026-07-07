"use client";
import { cn } from "@/shared/utils";
import { useMutation } from "@apollo/client/react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { PAGES } from "@/shared/config/page.config";

import { ResetFormData } from "@/shared/types/reset-form.types";

import { ResetPasswordDocument } from "@/shared/api/__generated__/graphql";

import AuthImage from "./AuthImage";

export function ResetPassword() {
  const ref = React.useRef<TurnstileInstance | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY;
  const [turnstileToken, setTurnstileToken] = React.useState<string | null>(
    null,
  );
  const searchParam = useSearchParams();
  const token = searchParam.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: {
      newPassword: "",
    },
  });

  const router = useRouter();

  const [auth, { loading }] = useMutation(ResetPasswordDocument);
  const handleAuth = async (data: ResetFormData) => {
    if (!turnstileToken || !token) {
      toast.error("Error password reset", { id: "auth-error" });
      return;
    }
    try {
      const newData = {
        newPassword: data.newPassword,
        token,
      };
      const result = await auth({
        variables: {
          data: newData,
        },
        context: {
          headers: {
            "cf-turnstile-token": turnstileToken,
          },
        },
      });

      const response = result.data;
      if (!response) return;

      toast.success("Reset password successful!", { id: "auth-success" });

      router.replace(PAGES.LOGIN);
    } catch (error) {
      toast.error("Error password reset", { id: "auth-error" });
      console.error("Authentication error:", error);
      setTurnstileToken(null);
      ref.current?.reset();
    }
  };

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
          RESET PASSWORD
        </h1>
        <form
          className="mt-5 space-y-4.5"
          onSubmit={(event) => {
            void handleSubmit(handleAuth)(event);
          }}
        >
          <div>
            <Input
              {...register("newPassword", {
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
                errors.newPassword && "border-red-500",
              )}
            />
            {errors.newPassword && (
              <p className="text-destructive text-sm mt-2">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="text-center">
            <Button
              variant={"secondary"}
              size={"lg"}
              disabled={!isValid || loading || !turnstileToken}
              type="submit"
            >
              Change
            </Button>
          </div>
        </form>
        <AuthImage />
      </div>
    </div>
  );
}
