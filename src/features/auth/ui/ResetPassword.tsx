"use client";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { PAGES } from "@/shared/config/page.config";

import { ResetFormData } from "@/shared/types/reset-form.types";

import { ResetPasswordDocument } from "@/shared/api/__generated__/graphql";

import { useTurnstileCaptcha } from "../hooks/useTurnstileCaptcha";

import AuthCard from "./AuthCard";
import AuthInputField from "./AuthInputField";
import AuthSubmitButton from "./AuthSubmitButton";

export function ResetPassword() {
  const captcha = useTurnstileCaptcha();
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
    if (!captcha.token || !token) {
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
            "cf-turnstile-token": captcha.token,
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
      captcha.reset();
    }
  };

  return (
    <AuthCard title="RESET PASSWORD" captchaWidget={captcha.widget}>
      <form
        className="mt-5 space-y-4.5"
        onSubmit={(event) => {
          void handleSubmit(handleAuth)(event);
        }}
      >
        <AuthInputField
          type="password"
          placeholder="Enter password:"
          registration={register("newPassword", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={errors.newPassword}
        />

        <AuthSubmitButton disabled={!isValid || loading || !captcha.token}>
          Change
        </AuthSubmitButton>
      </form>
    </AuthCard>
  );
}
