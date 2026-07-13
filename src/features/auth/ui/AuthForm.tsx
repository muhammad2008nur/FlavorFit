"use client";
import { useMutation } from "@apollo/client/react";
import { useApolloClient } from "@apollo/client/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { PAGES } from "@/shared/config/page.config";

import { AuthFormData } from "@/shared/types/auth-form.types";

import { isEmailRegex } from "@/shared/utils/is-email.regex";

import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
  MeDocument,
  RegisterDocument,
  RegisterMutation,
  RegisterMutationVariables,
} from "@/shared/api/__generated__/graphql";

import { useTurnstileCaptcha } from "../hooks/useTurnstileCaptcha";

import AuthCard from "./AuthCard";
import AuthChangeType from "./AuthChangeType";
import AuthInputField from "./AuthInputField";
import AuthSubmitButton from "./AuthSubmitButton";

interface Props {
  type: "login" | "register";
}

export function AuthForm({ type }: Props) {
  const isLogin = type === "login";

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
      password: "",
    },
  });

  const client = useApolloClient();
  const router = useRouter();

  const [auth, { loading }] = useMutation<
    LoginMutation | RegisterMutation,
    LoginMutationVariables | RegisterMutationVariables
  >(isLogin ? LoginDocument : RegisterDocument);

  const handleAuth = async (data: AuthFormData) => {
    if (!captcha.token) {
      toast.error("Please complete captcha");
      return;
    }
    try {
      const result = await auth({
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

      const authData = "login" in response ? response.login : response.register;

      await client.clearStore();

      client.writeQuery({
        query: MeDocument,
        data: {
          me: authData.user,
        },
      });

      toast.success(
        isLogin ? "Login successful!" : "Registration successful!",
        { id: "auth-success" },
      );

      router.replace(PAGES.DASHBOARD);
    } catch {
      toast.error("Error authorization !", { id: "auth-error" });
      captcha.reset();
    }
  };

  return (
    <AuthCard
      title={isLogin ? "Sign In" : "Sign Up"}
      captchaWidget={captcha.widget}
    >
      <form
        className="mt-5 space-y-4.5"
        onSubmit={(event) => {
          handleSubmit(handleAuth)(event);
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
        <AuthInputField
          type="password"
          placeholder="Enter password:"
          registration={register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={errors.password}
        />
        <AuthSubmitButton disabled={!isValid || loading || !captcha.token}>
          {!isLogin ? "Register" : "Login"}
        </AuthSubmitButton>
      </form>
      {isLogin && (
        <div className="text-center mt-4">
          <Link
            href={PAGES.REQUEST_RESET_PASSWORD}
            className="text-sm text-white hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      )}
      <AuthChangeType isLogin={isLogin} />
    </AuthCard>
  );
}
