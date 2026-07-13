"use client";
import { useMutation } from "@apollo/client/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { AuthFormData } from "@/shared/types/auth-form.types";

import { isEmailRegex } from "@/shared/utils/is-email.regex";

import { RequestPasswordResetDocument } from "@/shared/api/__generated__/graphql";

import { useTurnstileCaptcha } from "../hooks/useTurnstileCaptcha";

import AuthCard from "./AuthCard";
import AuthInputField from "./AuthInputField";
import AuthSubmitButton from "./AuthSubmitButton";

export function ResetPasswordRequest() {
  const captcha = useTurnstileCaptcha();

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
    if (!captcha.token) {
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
            "cf-turnstile-token": captcha.token,
          },
        },
      });

      const response = result.data;
      if (!response) return;

      toast.success("Reset password successful!", { id: "reset-success" });
    } catch (error) {
      toast.error("Reset password request failed", { id: "reset-error" });
      console.error("Reset password request error:", error);
      captcha.reset();
    }
  };

  return (
    <AuthCard title="Reset password" captchaWidget={captcha.widget}>
      <form
        className="mt-5 space-y-4.5"
        onSubmit={(event) => {
          void handleSubmit(handleReset)(event);
        }}
      >
        <AuthInputField
          type="email"
          placeholder="Enter email:"
          registration={register("email", {
            required: "This field is required",
            pattern: {
              value: isEmailRegex,
              message: "Enter a valid email",
            },
          })}
          error={errors.email}
        />

        <AuthSubmitButton disabled={!isValid || loading || !captcha.token}>
          Reset{" "}
        </AuthSubmitButton>
      </form>
    </AuthCard>
  );
}
