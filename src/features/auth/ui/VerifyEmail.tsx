"use client";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

import { PAGES } from "@/shared/config/page.config";

import { VerifyEmailDocument } from "@/shared/api/__generated__/graphql";

import { useTurnstileCaptcha } from "../hooks/useTurnstileCaptcha";

export function VerifyEmail() {
  const captcha = useTurnstileCaptcha();
  const searchParam = useSearchParams();
  const token = searchParam.get("token");

  const router = useRouter();
  const [verify] = useMutation(VerifyEmailDocument, {
    onCompleted() {
      toast.success("Email verified", { id: "verify-email-success" });
      router.replace(PAGES.DASHBOARD);
    },
    onError() {
      toast.error("Email verification failed", { id: "verify-email-error" });
      router.replace(PAGES.LOGIN);
    },
  });
  React.useEffect(() => {
    if (!token || !captcha.token) return;

    verify({
      variables: {
        token,
      },
      context: {
        headers: {
          "cf-turnstile-token": captcha.token,
        },
      },
    });
  }, [token, captcha.token, verify]);

  return (
    <div className="flex h-screen">
      {captcha.widget}

      <div className="text-center ">Verifying email...</div>
    </div>
  );
}
